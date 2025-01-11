import { HttpException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { FilterQuery, model, Model } from 'mongoose';
import { paginate } from '../../lib/helpers/pagination.helper';
import { PaginationResult } from '../../lib/interfaces/pagination-result.interface';
import { MovieGenre } from './schemas/movie-genre.schema';
import { MovieTrendingDay } from './schemas/movie-trending-day.schema';
import { MovieTrendingWeek } from './schemas/movie-trending-week.schema';
import axios from 'axios';
import { PineconeService } from '../pinecone/pinecone.service';

@Injectable()
export class MovieService {
  // private readonly embeddingApiUrl = 'http://127.0.0.1:5000/embed';
  private readonly embeddingApiUrl = 'https://python-embedding-service.onrender.com/embed';
  constructor(
    private readonly pineconeService: PineconeService,

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
}