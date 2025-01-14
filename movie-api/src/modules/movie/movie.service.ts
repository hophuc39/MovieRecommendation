import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { FilterQuery, Model } from 'mongoose';
import { PaginationResult } from '../../lib/interfaces/pagination-result.interface';
import { MovieGenre } from './schemas/movie-genre.schema';
import { MovieTrendingDay } from './schemas/movie-trending-day.schema';
import { MovieTrendingWeek } from './schemas/movie-trending-week.schema';
import axios from 'axios';
import { PineconeService } from '../pinecone/pinecone.service';
import { Watchlist } from './schemas/watchlist.schema';
import { Favorite } from './schemas/favorite.schema';
import { LlmsearchService } from '../llmsearch/llmsearch.service';

@Injectable()
export class MovieService {
  // private readonly embeddingApiUrl = 'http://127.0.0.1:5000/embed';
  private readonly embeddingApiUrl = 'https://python-embedding-service.onrender.com/embed';
  constructor(
    private readonly pineconeService: PineconeService,
    @Inject(forwardRef(() => LlmsearchService)) private readonly llmService: LlmsearchService,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(MovieGenre.name) private movieGenreModel: Model<MovieGenre>,
    @InjectModel(MovieTrendingDay.name) private movieTrendingDayModel: Model<MovieTrendingDay>,
    @InjectModel(MovieTrendingWeek.name) private movieTrendingWeekModel: Model<MovieTrendingWeek>,
    @InjectModel(Watchlist.name) private watchlistModel: Model<Watchlist>,
    @InjectModel(Favorite.name) private favoriteModel: Model<Favorite>
  ) {
  }

  async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await axios.post(this.embeddingApiUrl, { text: text });
      return response.data.embedding; // Embedding is returned as an array
    } catch (error) {
      console.error('Error generating query embedding:', error.message);
      throw new HttpException('Failed to generate query embedding', 500);
    }
  }

  async getMovieSuggestions(userQuery: string, topK: number): Promise<any> {
    // Generate embedding for user query
    const queryEmbedding = await this.generateEmbedding(userQuery);

    const recommendations = await this.pineconeService.findSimilarMovies(queryEmbedding, topK);

    const movieIds = recommendations.map((recommendation) => recommendation.id);

    const movies = await this.movieModel.find({ _id: { $in: movieIds } }).exec();

    const moviesWithScores = movies.map((movie) => {
      const recommendation = recommendations.find((rec) => rec.id === movie._id.toString());
      return {
        ...movie.toObject(),
        score: recommendation?.score,
        metadata: recommendation?.metadata
      };
    });

    return { recommendations: moviesWithScores };
  }

  async getLLMMovieSuggestions(userQuery: string, amount?: number): Promise<any> {
    const movieIds = await this.llmService.searchMovies(userQuery, 10);
    console.log("ids:", movieIds);
    const movies = await this.movieModel.find({ _id: { $in: movieIds } }).exec();

    const moviesWithScores = movies.map((movie) => {
      return {
        ...movie.toObject(),
      };
    });

    return { recommendations: moviesWithScores };
  }

  async getAllMovies(
    filter: FilterQuery<Movie> = {},
    sort: any = { popularity: -1 },
    page: number = 1,
    limit: number = 20
  ): Promise<PaginationResult<Movie>> {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.movieModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.movieModel.countDocuments(filter)
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getAllMovieGenres(): Promise<MovieGenre[]> {
    return this.movieGenreModel.find().exec();
  }

  async getAllMoviesTrendingDay(
    filter: FilterQuery<MovieTrendingDay> = {},
    limit?: number,
    offset?: number
  ): Promise<PaginationResult<MovieTrendingDay>> {
    const skip = offset || 0;
    const take = limit || 20;

    const [items, total] = await Promise.all([
      this.movieTrendingDayModel.find(filter)
        .skip(skip)
        .limit(take)
        .lean()
        .exec(),
      this.movieTrendingDayModel.countDocuments(filter)
    ]);

    return {
      items,
      total,
      page: Math.floor(skip / take) + 1,
      totalPages: Math.ceil(total / take)
    };
  }

  async getAllMoviesTrendingWeek(
    filter: FilterQuery<MovieTrendingWeek> = {},
    limit?: number,
    offset?: number
  ): Promise<PaginationResult<MovieTrendingWeek>> {
    const skip = offset || 0;
    const take = limit || 20;

    const [items, total] = await Promise.all([
      this.movieTrendingWeekModel.find(filter)
        .skip(skip)
        .limit(take)
        .lean()
        .exec(),
      this.movieTrendingWeekModel.countDocuments(filter)
    ]);

    return {
      items,
      total,
      page: Math.floor(skip / take) + 1,
      totalPages: Math.ceil(total / take)
    };
  }

  async getLatestTrailers(): Promise<Movie[]> {
    return this.movieModel.find()
      .sort({ 'trailers.publishedAt': -1 })
      .limit(5)
      .exec();
  }

  async getMovieDetail(id: string): Promise<Movie | null> {
    return this.movieModel.findOne({ tmdb_id: parseInt(id) })
      .lean()
      .exec();
  }

  async getMovieDetailByObjectId(id: string): Promise<any> {
    return this.movieModel.findOne({ _id: id })
      .lean()
      .exec();
  }

  async getMovieCredits(id: string) {
    const movie = await this.movieModel.findOne({ tmdb_id: parseInt(id) })
      .select('credits')
      .lean()
      .exec();

    return movie?.credits;
  }

  async getSimilarMovies(
    id: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<PaginationResult<Movie>> {
    const movie = await this.movieModel.findOne({ tmdb_id: parseInt(id) })
      .select('genres')
      .lean()
      .exec();

    if (!movie) {
      return { items: [], total: 0, page: 1, totalPages: 0 };
    }

    const genreIds = movie.genres.map(g => g.id);

    const [items, total] = await Promise.all([
      this.movieModel.find({
        tmdb_id: { $ne: parseInt(id) },
        'genres.id': { $in: genreIds }
      })
        .skip(offset)
        .limit(limit)
        .lean()
        .exec(),
      this.movieModel.countDocuments({
        tmdb_id: { $ne: parseInt(id) },
        'genres.id': { $in: genreIds }
      })
    ]);

    return {
      items,
      total,
      page: Math.floor(offset / limit) + 1,
      totalPages: Math.ceil(total / limit)
    };
  }

  async createReview(movieId: string, reviewData: { content: string; rating: number }, user: any): Promise<any> {
    const movie = await this.movieModel.findOne({ tmdb_id: parseInt(movieId) });
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }



    const review = {
      author: user.name || user.email,
      author_details: {
        name: user.name,
        username: user.email,
        avatar_path: user.picture,
        rating: reviewData.rating
      },
      content: reviewData.content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      url: '',
    };

    await this.movieModel.updateOne({ tmdb_id: parseInt(movieId) }, { $push: { reviews: review } });

    return review;
  }

  async toggleWatchlist(movieId: string, userId: string): Promise<{ inWatchlist: boolean }> {
    const exists = await this.watchlistModel.findOne({
      userId,
      movieId: parseInt(movieId)
    });

    if (!exists) {
      await this.watchlistModel.create({
        userId,
        movieId: parseInt(movieId)
      });
      return { inWatchlist: true };
    }

    await this.watchlistModel.deleteOne({
      userId,
      movieId: parseInt(movieId)
    });
    return { inWatchlist: false };
  }

  async toggleFavorite(movieId: string, userId: string): Promise<{ isFavorite: boolean }> {
    const exists = await this.favoriteModel.findOne({
      userId,
      movieId: parseInt(movieId)
    });

    if (!exists) {
      await this.favoriteModel.create({
        userId,
        movieId: parseInt(movieId)
      });
      return { isFavorite: true };
    }

    await this.favoriteModel.deleteOne({
      userId,
      movieId: parseInt(movieId)
    });
    return { isFavorite: false };
  }

  async getWatchlist(userId: string): Promise<Movie[]> {
    const watchlist = await this.watchlistModel.find({ userId }).lean();
    const movieIds = watchlist.map(item => item.movieId);
    return this.movieModel.find({ tmdb_id: { $in: movieIds } }).lean();
  }

  async getFavorites(userId: string): Promise<Movie[]> {
    const favorites = await this.favoriteModel.find({ userId }).lean();
    const movieIds = favorites.map(item => item.movieId);
    return this.movieModel.find({ tmdb_id: { $in: movieIds } }).lean();
  }

  async isInWatchlist(movieId: string, userId: string): Promise<boolean> {
    const exists = await this.watchlistModel.findOne({
      userId,
      movieId: parseInt(movieId)
    });
    return !!exists;
  }

  async isInFavorites(movieId: string, userId: string): Promise<boolean> {
    const exists = await this.favoriteModel.findOne({
      userId,
      movieId: parseInt(movieId)
    });
    return !!exists;
  }

  async searchMovies(query: string): Promise<Movie[]> {
    return this.movieModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { overview: { $regex: query, $options: 'i' } }
      ]
    })
      .sort({ popularity: -1 })
      .limit(20)
      .lean();
  }

  async searchMoviesWithLLM(query: string): Promise<any> {
    const results = await this.llmService.searchMovies(query, 20);
    return this.movieModel.find({
      _id: { $in: results }
    }).lean();
  }

  async getNavigate(query: string): Promise<any> {
    const results = await this.llmService.fetchNavigate(query);
    return results;
  }
}
