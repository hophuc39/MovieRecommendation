import { Module } from '@nestjs/common';
import { LlmsearchService } from './llmsearch.service';
import { LlmsearchController } from './llmsearch.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [LlmsearchService],
  controllers: [LlmsearchController],
  exports: [LlmsearchService],
})
export class LlmsearchModule { }

