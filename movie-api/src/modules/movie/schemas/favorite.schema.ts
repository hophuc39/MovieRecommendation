import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema({ collection: 'favorites', timestamps: true })
export class Favorite {
  @Prop({ required: true, name: 'user_id' })
  userId: string;

  @Prop({ required: true, name: 'movie_id' })
  movieId: number;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);