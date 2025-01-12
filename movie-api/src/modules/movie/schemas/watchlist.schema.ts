import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WatchlistDocument = HydratedDocument<Watchlist>;

@Schema({ collection: 'watchlists', timestamps: true })
export class Watchlist {
  @Prop({ required: true, name: 'user_id' })
  userId: string;

  @Prop({ required: true, name: 'movie_id' })
  movieId: number;
}

export const WatchlistSchema = SchemaFactory.createForClass(Watchlist);