import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type MovieTrendingWeekDocument = HydratedDocument<MovieTrendingWeek>;

@Schema({ collection: 'movies_trending_week' })
export class MovieTrendingWeek {
  @Prop()
  tmdbId: number;

  @Prop()
  adult: boolean;

  @Prop()
  backdropPath: string;

  @Prop(Array)
  categories: string[];

  @Prop([{ type: Object }])
  genres: {
    id: number;
  }[];

  @Prop()
  id: number;

  @Prop()
  mediaType: string;

  @Prop()
  originalLanguage: string;

  @Prop()
  originalTitle: string;

  @Prop()
  overview: string;

  @Prop()
  popularity: number;

  @Prop()
  posterPath: string;

  @Prop()
  releaseDate: string;

  @Prop()
  title: string;

  @Prop()
  video: boolean;

  @Prop()
  voteAverage: number;

  @Prop()
  voteCount: number;
}

export const MovieTredingWeekSchema = SchemaFactory.createForClass(MovieTrendingWeek);
