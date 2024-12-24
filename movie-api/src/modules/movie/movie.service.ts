import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { FilterQuery, Model } from 'mongoose';
import { paginate } from 'src/lib/helpers/pagination.helper';
import { PaginationResult } from 'src/lib/interfaces/pagination-result.interface';
import { MovieGenre } from './schemas/movie-genre.schema';
import { MovieTrendingDay } from './schemas/movie-trending-day.schema';
import { MovieTrendingWeek } from './schemas/movie-trending-week.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    @InjectModel(MovieGenre.name) private movieGenreModel: Model<MovieGenre>,
    @InjectModel(MovieTrendingDay.name) private movieTrendingDayModel: Model<MovieTrendingDay>,
    @InjectModel(MovieTrendingWeek.name) private movieTrendingWeekModel: Model<MovieTrendingWeek>,
  ) { }

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
}