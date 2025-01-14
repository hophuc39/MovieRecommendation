import { Controller, Get, Query, Param, Post, Body, Req, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) { }

  @Get('search')
  async searchMovies(@Query('query') query: string) {
    console.log("searchMovies", query);
    return this.movieService.searchMovies(query);
  }

  @Get('llm-search')
  @UseGuards(FirebaseAuthGuard)
  async searchMoviesWithLLM(@Query('query') query: string) {
    console.log("searchMoviesWithLLM", query);
    return this.movieService.searchMoviesWithLLM(query);
  }

  @Get()
  async getMoviesWithFilters(
    @Query('sort') sort: string = 'popularity.desc',
    @Query('genres') genres: string,
    @Query('minUserScore') minUserScore: string = '0',
    @Query('minUserVotes') minUserVotes: string = '0',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '20',
    @Query('query') query: string
  ) {
    const genreIds = genres ? genres.split(',').map(id => parseInt(id)) : [];

    const filter = {
      ...(genreIds.length > 0 && { 'genres.id': { $in: genreIds } }),
      ...(parseFloat(minUserScore) > 0 && { "vote_average": { $gte: parseFloat(minUserScore) } }),
      ...(parseInt(minUserVotes) > 0 && { "vote_count": { $gte: parseInt(minUserVotes) } }),
      ...(query && { "title": { $regex: query, $options: 'i' } }),
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

  @Get('navigate')
  @UseGuards(FirebaseAuthGuard)
  async getNavigate(@Query('query') query: string) {
    return this.movieService.getNavigate(query);
  }

  @Get(':objectId/tmdb_id')
  async getMovieTmdbIdByObjectId(@Param('objectId') objectId: string) {
    return this.movieService.getMovieTmdbIdByObjectId(objectId);
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

  @Post(':id/reviews')
  @UseGuards(FirebaseAuthGuard)
  async createReview(
    @Param('id') id: string,
    @Body() reviewData: { content: string; rating: number },
    @Req() req: any
  ) {
    return this.movieService.createReview(id, reviewData, req.user);
  }

  @Post(':id/watchlist')
  @UseGuards(FirebaseAuthGuard)
  async toggleWatchlist(
    @Param('id') id: string,
    @Req() req: any
  ) {
    return this.movieService.toggleWatchlist(id, req.user.uid);
  }

  @Post(':id/favorite')
  @UseGuards(FirebaseAuthGuard)
  async toggleFavorite(
    @Param('id') id: string,
    @Req() req: any
  ) {
    return this.movieService.toggleFavorite(id, req.user.uid);
  }

  @Get(':id/watchlist/status')
  @UseGuards(FirebaseAuthGuard)
  async checkWatchlistStatus(
    @Param('id') id: string,
    @Req() req: any
  ) {
    return this.movieService.isInWatchlist(id, req.user.uid);
  }

  @Get(':id/favorite/status')
  @UseGuards(FirebaseAuthGuard)
  async checkFavoriteStatus(
    @Param('id') id: string,
    @Req() req: any
  ) {
    return this.movieService.isInFavorites(id, req.user.uid);
  }

  @Get('user/watchlist')
  @UseGuards(FirebaseAuthGuard)
  async getWatchlist(@Req() req: any) {
    return this.movieService.getWatchlist(req.user.uid);
  }

  @Get('user/favorites')
  @UseGuards(FirebaseAuthGuard)
  async getFavorites(@Req() req: any) {
    return this.movieService.getFavorites(req.user.uid);
  }
}

