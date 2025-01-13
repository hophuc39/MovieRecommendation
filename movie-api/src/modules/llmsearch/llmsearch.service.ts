import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LlmsearchService {
    constructor(
        private readonly httpService: HttpService,
    ) {
        try {
            console.log('Checking LLM API status...');
            if (this.healthCheck())
                console.log("Service is healthy")
            // this.setupInterceptors();
        } catch (error) {
            console.error(error.message);
        }

    }

    private apikey = process.env.LLM_API_KEY;
    private url = process.env.LLM_API_URL || "http://awd-llm.azurewebsites.net";

    async healthCheck(): Promise<any> {
        const url = this.url + "/healthy";
        try {
            const response = await lastValueFrom(
                this.httpService.get(url, {
                    headers: {
                        accept: 'application/json',
                    },
                }),
            );
            if (response.data.status === 200)
                return true;
            else return false
        } catch (error) {
            console.error('Error fetching collections:', error.message);
        }
    }

    async fetchCollections(): Promise<any> {
        const url = this.url + "/knowledge-base/collections";
        try {
            const response = await lastValueFrom(
                this.httpService.get(url, {
                    headers: {
                        accept: 'application/json',
                    },
                }),
            );
            // console.log(response.data)
            return response.data.data;
        } catch (error) {
            console.error('Error fetching collections:', error.message);
            throw new Error('Failed to fetch collections');
        }
    }

    async fetchData(
        collectionName: string,
        query: string,
        amount?: number,
        threshold?: number,
    ): Promise<any> {
        const ApiKey = this.apikey;
        const url = this.url + "/retriever";
        const params = {
            llm_api_key: ApiKey,
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

    async fetchNavigate(Nquery: string): Promise<any> {
        const url = this.url + '/navigate/';
        const params = { llm_api_key: this.apikey, query: Nquery };
        const headers = { accept: 'application/json' };

        try {
            const response = await lastValueFrom(
                this.httpService.post(url, {}, { params, headers }),
            );
            return response.data;
        } catch (error) {
            console.error('Error:', error.message);
            throw error;
        }
    }

    async searchMovies(query: string, amount?: number, threshold?: number) {
        try {
            const queryResponse = await this.fetchData("movies", query, amount ?? 10, threshold ?? 0.5);
            console.log(queryResponse);

            const movies_id = queryResponse.result;
            return movies_id;
        } catch (error) {
            if (error.response) {
                console.error(`API Error: ${error.response.status} - ${error.response.data.message}`);
            } else {
                console.error('Unexpected error occurred when finding movies:', error.message);
            }
            throw error;
        }
    }
    async searchSimilarMovies(query: string, amount?: number, threshold?: number) {
        try {
            const queryResponse = await this.fetchData("similar", query, amount ?? 10, threshold ?? 0.5);
            const movies_id = queryResponse.result;
            return movies_id;
        } catch (error) {
            if (error.response) {
                console.error(`API Error: ${error.response.status} - ${error.response.data.message}`);
            } else {
                console.error('Unexpected error occurred when finding similar movies:', error.message);
            }
            throw error;
        }
    }

}
