import { Controller, Get, Query } from '@nestjs/common';

import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) { }

  @Get()
  async getAllMovies(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return await this.movieService.getAllMovies(null, limit = limit, offset = offset);
  }

  @Get('genres')
  async getAllMovieGenres(

  ) {
    return await this.movieService.getAllMovieGenres();
  }

  @Get('trending/day')
  async getAllMoviesTrendingDay(

    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return await this.movieService.getAllMoviesTrendingDay(null, limit = limit, offset = offset);
  }

  @Get('trending/week')
  async getAllMoviesTrendingWeek(

    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return await this.movieService.getAllMoviesTrendingWeek(null, limit = limit, offset = offset);
  }

  @Get('recommend')
  async recommendMovies(
    @Query('query') query: string,
    @Query('topK') topK: number = 10
  ) {
    return this.movieService.getMovieSuggestions(query, topK);
  }

  @Get('latest-trailers')
  async getLatestTrailers() {
    return this.movieService.getLatestTrailers();
  }
}
