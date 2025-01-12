import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieService } from './movie.service';
import { MovieSchema } from './schemas/movie.schema';
import { MovieController } from './movie.controller';
import { MovieGenreSchema } from './schemas/movie-genre.schema';
import { MovieTredingDaySchema } from './schemas/movie-trending-day.schema';
import { MovieTredingWeekSchema } from './schemas/movie-trending-week.schema';
import { PineconeModule } from '../pinecone/pinecone.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { LlmsearchModule } from '../llmsearch/llmsearch.module';
import { WatchlistSchema } from './schemas/watchlist.schema';
import { FavoriteSchema } from './schemas/favorite.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Movie', schema: MovieSchema },
      { name: "MovieGenre", schema: MovieGenreSchema },
      { name: "MovieTrendingDay", schema: MovieTredingDaySchema },
      { name: "MovieTrendingWeek", schema: MovieTredingWeekSchema },
      { name: "Watchlist", schema: WatchlistSchema },
      { name: "Favorite", schema: FavoriteSchema }
    ]),
    PineconeModule,
    FirebaseModule,
    LlmsearchModule
  ],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService]
})
export class MovieModule { }
