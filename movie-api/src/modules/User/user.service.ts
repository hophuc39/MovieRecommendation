import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from '../movie/schemas/movie.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>
    ) {

    }

    async findOrCreateUser(firebaseUid: string, email: string, name: string): Promise<User> {
        let user = await this.userModel.findOne({ firebaseUid: firebaseUid });
        if (!user) {
            user = await this.userModel.create({ firebaseUid, email, name });
        }
        return user;
    }

    async addMovieToLikedList(userId: string, movieId: string): Promise<User> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { likedMovies: movieId } },
            { new: true },
        );
    }

    async createWatchlist(userId: string, name: string): Promise<User> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            { $push: { watchlists: { name, movies: [] } } },
            { new: true },
        )
    }

    async addMovieToWatchlist(userId: string, watchlistName: string, movieId: string): Promise<User> {
        return await this.userModel.findOneAndUpdate(
            { _id: userId, 'watchlists.name': watchlistName },
            { $addToSet: { 'watchlists.$.movies': movieId } },
            { new: true },
        );
    }

    async saveSearch(userId: string, searchQuery: string): Promise<User> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                $push: {
                    savedSearches: { query: searchQuery, createdAt: new Date() },
                },
            },
            { new: true },
        );
    }

    async addCustomTag(userId: string, movieId: string, tag: string): Promise<User> {
        return await this.userModel.findByIdAndUpdate(
            userId,
            {
                $addToSet: {
                    customTags: { movie: movieId, tag },
                },
            },
            { new: true },
        );
    }

    async getMoviesByTag(userId: string, tag: string): Promise<string[]> {
        const user = await this.userModel.findOne(
            { _id: userId, 'customTags.tag': tag },
            { 'customTags.$': 1 },
        ).populate('customTags.movie');

        return user?.customTags.map((entry) => entry.movie.toString()) || [];
    }

    async generateShareId(userId: string, watchlistName: string): Promise<User> {
        return await this.userModel.findOneAndUpdate(
            { _id: userId, 'watchlists.name': watchlistName },
            {
                $set: {
                    'watchlists.$.shared': true,
                    'watchlists.$.shareId': uuidv4(),
                },
            },
            { new: true },
        );
    }

    async getSharedWatchlist(shareId: string): Promise<any> {
        const user = await this.userModel.findOne(
            { 'watchlists.shareId': shareId },
            { 'watchlists.$': 1 },
        ).populate('watchlists.movies');

        if (!user) {
            throw new Error('Watchlist not found or not shared');
        }

        return user.watchlists[0];
    }

}
