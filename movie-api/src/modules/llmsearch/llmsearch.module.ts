import { forwardRef, Module } from '@nestjs/common';
import { LlmsearchService } from './llmsearch.service';
import { LlmsearchController } from './llmsearch.controller';
import { HttpModule } from '@nestjs/axios';
import { MovieModule } from '../movie/movie.module';
@Module({
  imports: [HttpModule, forwardRef(() => MovieModule)],
  providers: [LlmsearchService],
  controllers: [LlmsearchController],
  exports: [LlmsearchService],
})
export class LlmsearchModule { }

