import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LlmsearchService {
    constructor(
        private readonly httpService: HttpService,
    ) { }
    private apikey = process.env.LLM_API_KEY;
    private url = process.env.LLM_API_URL || "http://awd-llm.azurewebsites.net";

    async fetchCollections(): Promise<any>{
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
        const ApiKey = this.apikey ;
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

    async fetchNavigate(query: string): Promise<any> {
        const ApiKey = this.apikey;
        const url = this.url + "/navigate";
        const params = {
            llm_api_key: ApiKey,
            query: query,
        };
        const data = {};
        try {
            const response = await lastValueFrom(
                // this.httpService.post(url, {null,
                //     params,
                //     headers: {
                //         accept: 'application/json',
                //     },
                // }),
                this.httpService.post(url, undefined, {
                    params: { key: 'value' }, // Query params (nếu có)
                    headers: {  accept: 'application/json', }, // Headers (nếu cần)
                  })
            );
            return response.data;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch navigation data');
        }
    }
    
}
