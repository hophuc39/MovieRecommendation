import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true, unique: true })
  firebaseUid: string; // Unique Firebase UID for authentication

  @Prop()
  email?: string;

  @Prop()
  name?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Movie' }] })
  likedMovies: Types.ObjectId[]; // References to liked movies

  @Prop({
    type: [
      {
        name: { type: String, required: true },
        movies: [{ type: Types.ObjectId, ref: 'Movie' }], // References to movies in the watchlist
        shared: { type: Boolean, default: false }, // Indicates if the watchlist is shared
        sharedId: { type: String, unique: true }, // Unique ID for sharing the watchlist
      },
    ],
  })
  watchlists: {
    name: string;
    movies: Types.ObjectId[];
    shared: boolean;
    sharedId: string;
  }[];

  @Prop({
    type: [
      {
        movie: { type: Types.ObjectId, ref: 'Movie' }, // Reference to the movie being rated
        rating: { type: Number, min: 1, max: 5 }, // Rating between 1 and 5
      },
    ],
  })
  ratings: {
    movie: Types.ObjectId;
    rating: number;
  }[];

  @Prop({
    type: [
      {
        movie: { type: Types.ObjectId, ref: 'Movie' }, // Reference to the movie
        tag: { type: String, required: true }, // Custom tag for the movie
      },
    ],
  })
  customTags: {
    movie: Types.ObjectId;
    tag: string;
  }[];

  @Prop({
    type: [
      {
        query: { type: String, required: true }, // The saved search query
        createdAt: { type: Date, default: Date.now }, // Timestamp of when the search was saved
      },
    ],
  })
  savedSearches: {
    query: string;
    createdAt: Date;
  }[];
}

export const UserSchema = SchemaFactory.createForClass(User);