import { Controller, Get } from '@nestjs/common';

import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) { }

  @Get()
  async getAllMovies() {
    return await this.movieService.getAllMovies();
  }

  @Get('genres')
  async getAllMovieGenres() {
    return await this.movieService.getAllMovieGenres();
  }

  @Get('trending/day')
  async getAllMoviesTrendingDay() {
    return await this.movieService.getAllMoviesTrendingDay();
  }

  @Get('trending/week')
  async getAllMoviesTrendingWeek() {
    return await this.movieService.getAllMoviesTrendingWeek();
  }
}
