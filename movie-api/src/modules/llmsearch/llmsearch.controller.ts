import { Controller, Get, Query } from '@nestjs/common';
import { LlmsearchService } from './llmsearch.service';

@Controller('llmsearch')
export class LlmsearchController {
  constructor(private readonly llmService: LlmsearchService) { }

  @Get('collections')
  async getCollection() {
    try {
      return await this.llmService.fetchCollections();

    } catch (error) {
      console.error('Error fetching collections:', error.message);
    }
  }
  @Get('search')
  async llmsearch(
    @Query('collection_name') collectionName: string,
    @Query('query') query: string,
    @Query('amount') amount?: number,
    @Query('threshold') threshold?: number,
  ) {
    try {
      return await this.llmService.fetchData(
        collectionName,
        query,
        amount,
        threshold,
      );
    } catch (error) {
      console.error('Error fetching collections:', error.message);
    }
  }

  @Get('getMovieSuggestion')
  async llmSearchMovie(
    @Query('query') query: string,
  ) {
    try {
      return await this.llmService.searchMovies(
        query,
      );
    } catch (error) {
      console.error('Error fetching collections:', error.message);
    }
  }

  @Get('navigate')
  async navigate(
    @Query('query') query: string,
  ) {
    try {
      console.log("navigate query = \"", query, "\"")
      const res = await this.llmService.fetchNavigate(query);
      return res.data;
    } catch (error) {
      console.error('Error fetching navigate:', error.message);
    }

  }
}
