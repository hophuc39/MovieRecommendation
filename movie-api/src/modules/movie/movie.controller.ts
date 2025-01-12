import { Controller, Get, Query, Param } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) { }

  @Get()
  async getMovies(
    @Query('sort') sort: string = 'popularity.desc',
    @Query('genres') genres: string,
    @Query('minUserScore') minUserScore: string = '0',
    @Query('minUserVotes') minUserVotes: string = '0',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
  ) {
    const genreIds = genres ? genres.split(',').map(id => parseInt(id)) : [];

    const filter = {
      ...(genreIds.length > 0 && { 'genres.id': { $in: genreIds } }),
      ...(parseFloat(minUserScore) > 0 && { "vote_average": { $gte: parseFloat(minUserScore) } }),
      ...(parseInt(minUserVotes) > 0 && { "vote_count": { $gte: parseInt(minUserVotes) } }),
    };

    const [sortField, sortOrder] = sort.split('.');
    const sortOptions = {
      [sortField]: sortOrder === 'desc' ? -1 : 1
    };

    return this.movieService.getAllMovies(
      filter,
      sortOptions,
      parseInt(page),
      parseInt(limit)
    );
  }

  @Get('genres')
  async getAllMovieGenres() {
    return this.movieService.getAllMovieGenres();
  }

  @Get('trending/day')
  async getAllMoviesTrendingDay(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.movieService.getAllMoviesTrendingDay(null, limit, offset);
  }

  @Get('trending/week')
  async getAllMoviesTrendingWeek(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.movieService.getAllMoviesTrendingWeek(null, limit, offset);
  }

  @Get('latest-trailers')
  async getLatestTrailers() {
    return this.movieService.getLatestTrailers();
  }

  @Get(':id')
  async getMovieDetail(@Param('id') tmdbId: string) {
    return this.movieService.getMovieDetail(tmdbId);
  }

  @Get(':id/credits')
  async getMovieCredits(@Param('id') tmdbId: string) {
    return this.movieService.getMovieCredits(tmdbId);
  }

  @Get(':id/similar')
  async getSimilarMovies(
    @Param('id') tmdbId: string,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0
  ) {
    return this.movieService.getSimilarMovies(tmdbId, limit, offset);
  }
}

