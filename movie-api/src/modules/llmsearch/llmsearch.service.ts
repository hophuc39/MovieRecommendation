import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LlmsearchService {
    constructor(
        private readonly httpService: HttpService,
    ) { }
    private apikey = process.env.LLM_API_KEY;

    async fetchData(
        collectionName: string,
        query: string,
        amount?: number,
        threshold?: number,
    ): Promise<any> {
        const geminiApiKey = this.apikey;
        const url = 'https://awd-llm.azurewebsites.net/retriever/';
        const params = {
            gemini_api_key: geminiApiKey,
            collection_name: collectionName,
            query: query,
            amount: amount || 25, // default value
            threshold: threshold || 0.5, // default value
        };
        try {
            const response = await lastValueFrom(
                this.httpService.get(url, {
                    params,
                    headers: {
                        accept: 'application/json',
                    },
                }),
            );
            return response.data.data;
        } catch (error) {
            console.error('Error fetching data:', error.message);
            throw new Error('Failed to fetch data');
        }
    }
}
