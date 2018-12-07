import { IHttp, IHttpResponse, IHttpRequest, RequestMethod } from '@rocket.chat/apps-engine/definition/accessors';
import HttpResponseMock from './HttpResponseMock';
let rq = require('request-promise');

export class HttpMock implements IHttp {
    async get(url: string, options: IHttpRequest): Promise<IHttpResponse> {
        let response: IHttpResponse;

        response = HttpResponseMock;

        return response;
    }

    async post(url: string, options: IHttpRequest): Promise<IHttpResponse> {
        let response: IHttpResponse = HttpResponseMock;
        let config = {
            method: 'POST',
            uri: url,
            headers: options.headers,
            body: options.data,
            resolveWithFullResponse: true
        };
        let rawResponse;
        
        
        rawResponse = await rq(config);
        response.headers = rawResponse.headers;
        response.statusCode = rawResponse.statusCode;
        response.url = config.uri;
        response.data = rawResponse.body;

        return response;
    }

    async put(url: string, options: IHttpRequest): Promise<IHttpResponse> {
        let response: IHttpResponse;

        response = HttpResponseMock;

        return response;
    }

    async del(url: string, options: IHttpRequest): Promise<IHttpResponse> {
        let response: IHttpResponse;

        response = HttpResponseMock;

        return response;
    }
}