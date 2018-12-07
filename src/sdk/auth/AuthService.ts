import { IHttp, IHttpRequest, IHttpResponse } from "@rocket.chat/apps-engine/definition/accessors";
import { TokenExchangeParams } from "./TokenExchangeParams";
import { TokenExchangeResponse } from "./TokenExchangeResponse";
import { RefreshAccessTokenParams } from "./RefreshAccessTokenParams";
import { RefreshAccessTokenResponse } from "./RefreshAccessTokenResponse";

export class AuthService {
	private http: IHttp;

	constructor(http: IHttp) {
		this.http = http;
	}

	getAuthUrl(clientId: string): string {
		return `https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=${clientId}&scope=request+ride_widgets&redirect_uri=https://github.com/kheidrich/uberocket`
	}

	async tokenExchange(params: TokenExchangeParams): Promise<TokenExchangeResponse> {
		let response: TokenExchangeResponse;
		let body = {};
		let exchangeRequest: IHttpRequest;
		let exchangeResponse: IHttpResponse;

		body['client_secret'] = params.clientSecret;
		body['client_id'] = params.clientId;
		body['code'] = params.code;
		body['grant_type'] = 'authorization_code';
		body['redirect_uri'] = 'https://github.com/kheidrich/uberocket';

		exchangeRequest = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: this.toUrlEncoded(body)
		};
		exchangeResponse = JSON.parse((await this.http.post('https://login.uber.com/oauth/v2/token', exchangeRequest)).data);
		response = {
			accessToken: exchangeResponse['access_token'],
			refreshToken: exchangeResponse['refresh_token'],
			expirationDate: this.calculateExpirationDate(exchangeResponse['expires_in'])
		};

		return response;
	}

	async refreshAccessToken(params: RefreshAccessTokenParams): Promise<RefreshAccessTokenResponse> {
		let response: RefreshAccessTokenResponse;
		let body = {};
		let refreshRequest: IHttpRequest;
		let refreshResponse: IHttpResponse;

		body['client_secret'] = params.clientSecret;
		body['client_id'] = params.clientId;
		body['refresh_token'] = params.refreshToken;
		body['grant_type'] = 'refresh_token';

		refreshRequest = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: this.toUrlEncoded(body)
		};
		refreshResponse = JSON.parse((await this.http.post('https://login.uber.com/oauth/v2/token', refreshRequest)).data);
		response = {
			accessToken: refreshResponse['access_token'],
			expirationDate: this.calculateExpirationDate(refreshResponse['expires_in'])
		}

		return response;
	}

	private toUrlEncoded(obj: Object): string {
		return Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
	}

	private calculateExpirationDate(duration: number): Date {
		let now = Date.now();

		return new Date(now + duration);
	}
}