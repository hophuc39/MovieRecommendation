import { Controller, UseGuards, Post, Body, Request, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {

    }

    @UseGuards(FirebaseAuthGuard)
    @Post('like-movie')
    async likeMovie(@Request() req, @Body('movieId') movieId: string) {
        const userId = req.user.uid;
        return this.userService.addMovieToLikedList(userId, movieId);
    }

    @UseGuards(FirebaseAuthGuard)
    @Post('create-watchlist')
    async createWatchlist(@Request() req, @Body('name') name: string) {
        const userId = req.user.uid;
        return this.userService.createWatchlist(userId, name);
    }

    @UseGuards(FirebaseAuthGuard)
    @Post('add-to-watchlist')
    async addToWatchlist(
        @Request() req,
        @Body('watchlistName') watchlistName: string,
        @Body('movieId') movieId: string,
    ) {
        const userId = req.user.uid;
        return this.userService.addMovieToWatchlist(userId, watchlistName, movieId);
    }

    @UseGuards(FirebaseAuthGuard)
    @Post('save-search')
    async saveSearch(@Request() req, @Body('query') query: string) {
        const userId = req.user.uid;
        return this.userService.saveSearch(userId, query);
    }

    @UseGuards(FirebaseAuthGuard)
    @Post('add-tag')
    async addCustomTag(
        @Request() req,
        @Body('movieId') movieId: string,
        @Body('tag') tag: string,
    ) {
        const userId = req.user.uid;
        return this.userService.addCustomTag(userId, movieId, tag);
    }

    @UseGuards(FirebaseAuthGuard)
    @Post('share-watchlist')
    async shareWatchlist(
        @Request() req,
        @Body('watchlistName') watchlistName: string,
    ) {
        const userId = req.user.uid;
        return this.userService.generateShareId(userId, watchlistName);
    }

    // Generate a shared link like this: https://yourapp.com/watchlist/shared/{shareId}
    @Get('shared-watchlist/:shareId')
    async getSharedWatchlist(@Param('shareId') shareId: string) {
        return this.userService.getSharedWatchlist(shareId);
    }

}
