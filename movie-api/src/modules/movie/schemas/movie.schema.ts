import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type MovieDocument = HydratedDocument<Movie>;

// Thêm interface cho Review
interface Review {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

@Schema({ collection: 'movies' })
export class Movie {
  @Prop({ required: true })
  tmdb_id: number;

  @Prop()
  adult: boolean;

  @Prop()
  backdropPath: string;

  @Prop({
    type: Object
  })
  belongsToCollection: {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
  }

  @Prop()
  budget: number;

  @Prop(Array)
  categories: string[];

  @Prop([{ type: Object }])
  genres: {
    id: number;
    name: string;
  }[];

  @Prop()
  homepage: string;

  @Prop()
  id: number;

  @Prop()
  imdbId: string;

  @Prop(Array)
  originCountry: string[];

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

  @Prop({
    type: [{
      id: Number,
      logoPath: String,
      name: String,
      originCountry: String
    }]
  })
  productionCompanies: {
    id: number;
    logoPath: string;
    name: string;
    originCountry: string;
  }[];

  @Prop({
    type: [{
      iso31661: String,
      name: String
    }]
  })
  productionCountries: {
    iso31661: string;
    name: string;
  }[];

  @Prop()
  releaseDate: string;

  @Prop()
  revenue: number;

  @Prop()
  runtime: number;

  @Prop({
    type: [{
      englishName: String,
      iso31661: String,
      name: String
    }]
  })
  spokenLanguages: {
    englishName: string;
    iso6391: string;
    name: string;
  }[];

  @Prop()
  status: string;

  @Prop()
  tagline: string;

  @Prop()
  title: string;

  @Prop()
  video: boolean;

  @Prop()
  voteAverage: number;

  @Prop()
  voteCount: number;

  @Prop({
    type: {
      id: Number,
      cast: [{
        adult: Boolean,
        gender: Number,
        id: Number,
        knownForDepartment: String,
        name: String,
        originalName: String,
        popularity: Number,
        profilePath: String,
        castId: Number,
        character: String,
        creditId: String,
        order: Number,
      }],
      crew: [{
        adult: Boolean,
        gender: Number,
        id: Number,
        knownForDepartment: String,
        name: String,
        originalName: String,
        popularity: Number,
        profilePath: String,
        creditId: String,
        department: String,
        job: String,
      }]
    }
  })
  credits: {
    id: number;
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      knownForDepartment: string;
      name: string;
      originalName: string;
      popularity: number;
      profilePath: string;
      castId: number;
      character: string;
      creditId: string;
      order: number;
    }[];
    crew: {
      adult: boolean;
      gender: number;
      id: number;
      knownForDepartment: string;
      name: string;
      originalName: string;
      popularity: number;
      profilePath: string;
      creditId: string;
      department: string;
      job: string;
    }[];
    trailers: {
      id: string;
      iso6391: string;
      iso31661: string;
      key: string;
      name: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      publishedAt: string;
    }[];

    reviews: Review[];
  };

  @Prop([{
    author: String,
    author_details: {
      name: String,
      username: String,
      avatar_path: String,
      rating: Number
    },
    content: String,
    created_at: String,
    updated_at: String,
    url: String
  }])
  reviews: Review[];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
