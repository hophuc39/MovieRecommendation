import { Controller, Get, Query } from '@nestjs/common';
import { LlmsearchService } from './llmsearch.service';

@Controller('llmsearch')
export class LlmsearchController {
  constructor(private readonly llmService: LlmsearchService) {}

  @Get('search')
  async search(
    @Query('collection_name') collectionName: string,
    @Query('query') query: string,
    @Query('amount') amount?: number,
    @Query('threshold') threshold?: number,
  ) {
    return await this.llmService.fetchData(
      collectionName,
      query,
      amount,
      threshold,
    );
  }
}
