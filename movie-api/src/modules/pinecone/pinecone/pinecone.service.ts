import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';

@Injectable()
export class PineconeService {
    private pinecone: Pinecone;
    private index;

    constructor() {
        this.pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY,
        });
        this.index = this.pinecone.index("movies");
    }

    async findSimilarMovies(embedding: number[], topK: number = 10) {
        const queryResponse = await this.index.query({
            vector: embedding,
            topK: topK,
            includeMetadata: true,
        });

        return queryResponse.matches.map((match) => ({
            id: match.id,
            score: match.score,
            metadata: match.metadata
        }));
    }

}