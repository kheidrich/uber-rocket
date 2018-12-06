import { IHttp, IHttpResponse, IHttpRequest, RequestMethod } from '@rocket.chat/apps-engine/definition/accessors';
import HttpResponseMock from './HttpResponseMock';
let rq = require('request-promise');

export class HttpMock implements IHttp {
    async get(url: string, options: IHttpRequest): Promise<IHttpResponse> {
        let response: IHttpResponse;

        response = HttpResponseMock;

        return Promise.resolve(response);
    }

    async post(url: string, options: IHttpRequest): Promise<IHttpResponse> {
        let response = HttpResponseMock;
        let config = {
            method: 'POST',
            uri: url,
            headers: options.headers,
            body: options.data,
            resolveWithFullResponse: true
        };
        let rawResponse;
        
        
        rawResponse = await rq(config);
        console.log(rawResponse.request.body);
        
        response.headers = rawResponse.headers;
        response.url = config.uri;
        
        console.log(rawResponse.body.access_token);

        return Promise.resolve(response);
    }

    async put(url: string, options: IHttpRequest): Promise<IHttpResponse> {
        let response: IHttpResponse;

        response = HttpResponseMock;

        return Promise.resolve(response);
    }

    async del(url: string, options: IHttpRequest): Promise<IHttpResponse> {
        let response: IHttpResponse;

        response = HttpResponseMock;

        return Promise.resolve(response);
    }
}