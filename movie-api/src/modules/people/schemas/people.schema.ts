import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type PeopleDocument = HydratedDocument<People>;

@Schema({ collection: 'people' })
export class People {
  tmdbId: number;

  adult: boolean;

  alsoKnownAs: string[];

  biography: string;

  birthday: string;

  deathday: string;

  gender: number;

  homepage: string;

  id: number;

  imdbId: string;

  knownForDepartment: string;

  name: string;

  placeOfBirth: string;

  popularity: number;

  profilePath: string;

  @Prop({
    type: {
      id: Number,
      cast: [{
        adult: Boolean,
        backdropPath: String,
        genreIds: [Number],
        id: Number,
        originalLanguage: String,
        originalTitle: String,
        overview: String,
        popularity: Number,
        posterPath: String,
        releaseDate: String,
        title: String,
        video: Boolean,
        voteAverage: Number,
        voteCount: Number,
        character: String,
        creditId: String,
        order: Number,
      }],
      crew: [{
        adult: Boolean,
        backdropPath: String,
        genreIds: [Number],
        id: Number,
        originalLanguage: String,
        originalTitle: String,
        overview: String,
        popularity: Number,
        posterPath: String,
        releaseDate: String,
        title: String,
        video: Boolean,
        voteAverage: Number,
        voteCount: Number,
        creditId: String,
        department: String,
        job: String,
      }]
    }
  })
  movieCredits: {
    id: number,
    cast: {
      adult: boolean;
      backdropPath: string;
      genreIds: number[];
      id: number;
      originalLanguage: string;
      originalTitle: string;
      overview: string;
      popularity: number;
      posterPath: string;
      releaseDate: string;
      title: string;
      video: boolean;
      voteAverage: number;
      voteCount: number;
      character: string;
      creditId: string;
      order: number;
    }[],
    crew: {
      adult: boolean;
      backdropPath: string;
      genreIds: number[];
      id: number;
      originalLanguage: string;
      originalTitle: string;
      overview: string;
      popularity: number;
      posterPath: string;
      releaseDate: string;
      title: string;
      video: boolean;
      voteAverage: number;
      voteCount: number;
      creditId: string;
      department: string;
      job: string;
    }[]
  }
}

export const PeopleSchema = SchemaFactory.createForClass(People);