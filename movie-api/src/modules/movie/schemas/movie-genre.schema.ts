import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type MovieGenreDocument = HydratedDocument<MovieGenre>;

@Schema({ collection: 'movie_genres' })
export class MovieGenre {
  @Prop()
  tmdbId: number;

  @Prop()
  id: number;

  @Prop()
  name: string;
}

export const MovieGenreSchema = SchemaFactory.createForClass(MovieGenre);
