import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MovieService } from './movie.service';
import { MovieSchema } from './schemas/movie.schema';
import { MovieController } from './movie.controller';
import { MovieGenreSchema } from './schemas/movie-genre.schema';
import { MovieTredingDaySchema } from './schemas/movie-trending-day.schema';
import { MovieTredingWeekSchema } from './schemas/movie-trending-week.schema';
import { PineconeModule } from '../pinecone/pinecone/pinecone.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Movie', schema: MovieSchema },
      { name: "MovieGenre", schema: MovieGenreSchema },
      { name: "MovieTrendingDay", schema: MovieTredingDaySchema },
      { name: "MovieTrendingWeek", schema: MovieTredingWeekSchema }
    ]),
    PineconeModule
  ],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule { }
