import { IHttp, IHttpRequest, IHttpResponse } from "@rocket.chat/apps-engine/definition/accessors";
import { TokenExchangeParams } from "./TokenExchangeParams";
import { TokenExchangeResponse } from "./TokenExchangeResponse";

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

		console.log( this.toUrlEncoded(body));
		exchangeRequest = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: this.toUrlEncoded(body)
		};

		exchangeResponse = await this.http.post('https://login.uber.com/oauth/v2/token', exchangeRequest);
		response = { accessToken: 'token' };

		return response;
	}

	async login(): Promise<any> {


	}

	private toUrlEncoded(obj: Object): string {
		 return Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
	}
}