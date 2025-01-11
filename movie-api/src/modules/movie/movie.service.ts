import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { FilterQuery, Model, ObjectId, Types } from 'mongoose';
import { paginate } from '../../lib/helpers/pagination.helper';
import { PaginationResult } from '../../lib/interfaces/pagination-result.interface';
import { MovieGenre } from './schemas/movie-genre.schema';
import { MovieTrendingDay } from './schemas/movie-trending-day.schema';
import { MovieTrendingWeek } from './schemas/movie-trending-week.schema';
import axios from 'axios';
import { PineconeService } from '../pinecone/pinecone.service';
import { LlmsearchService } from "src/modules/llmsearch/llmsearch.service";
@Injectable()
export class MovieService {
  // private readonly embeddingApiUrl = 'http://127.0.0.1:5000/embed';
  private readonly embeddingApiUrl = 'https://python-embedding-service.onrender.com/embed';
  constructor(
    private readonly pineconeService: PineconeService,
    private readonly llmService: LlmsearchService,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(MovieGenre.name) private movieGenreModel: Model<MovieGenre>,
    @InjectModel(MovieTrendingDay.name) private movieTrendingDayModel: Model<MovieTrendingDay>,
    @InjectModel(MovieTrendingWeek.name) private movieTrendingWeekModel: Model<MovieTrendingWeek>,
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

  async getAllMovies(filter: FilterQuery<MovieGenre> = {}, limit?: number, offset?: number): Promise<PaginationResult<Movie>> {
    return paginate<Movie>(this.movieModel, filter, limit, offset);
  }

  async getAllMovieGenres(): Promise<MovieGenre[]> {
    return this.movieGenreModel.find().exec();
  }

  async getAllMoviesTrendingDay(filter: FilterQuery<MovieTrendingDay> = {}, limit?: number, offset?: number): Promise<PaginationResult<MovieTrendingDay>> {
    return paginate<MovieTrendingDay>(this.movieTrendingDayModel, filter, limit, offset);
  }

  async getAllMoviesTrendingWeek(filter: FilterQuery<MovieTrendingWeek> = {}, limit?: number, offset?: number): Promise<PaginationResult<MovieTrendingWeek>> {
    return paginate<MovieTrendingWeek>(this.movieTrendingWeekModel, filter, limit, offset);
  }

  async getLatestTrailers(): Promise<Movie[]> {
    return this.movieModel.find().sort({ 'trailers.publishedAt': -1 }).limit(5).exec();
  }

  async getMovieDetail(id: string): Promise<any> {
    const movie = await this.movieModel.findOne({ tmdb_id: parseInt(id) })
      .lean()
      .exec();
    return movie;
  }

  async getMovieCredits(id: string) {
    const movie = await this.movieModel.findOne({ tmdb_id: parseInt(id) })
      .select('credits')
      .lean()
      .exec();

    return movie?.credits;
  }

  async getSimilarMovies(id: string, limit: number = 20, offset: number = 0) {
    const movie = await this.movieModel.findOne({ tmdb_id: parseInt(id) })
      .select('genres')
      .lean()
      .exec();

    if (!movie) {
      return { items: [], total: 0 };
    }

    const genreIds = movie.genres.map(g => g.id);

    const similarMovies = await this.movieModel.find({
      tmdb_id: { $ne: parseInt(id) },
      'genres.id': { $in: genreIds }
    })
      .sort({ popularity: -1 })
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();

    const total = await this.movieModel.countDocuments({
      tmdb_id: { $ne: parseInt(id) },
      'genres.id': { $in: genreIds }
    });

    return {
      items: similarMovies,
      total
    };
  }
}