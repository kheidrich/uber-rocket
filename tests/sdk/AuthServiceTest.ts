import { AuthService } from "../../src/sdk/auth/AuthService";
import { HttpMock } from "../mocks/HttpMock";
import { TokenExchangeParams } from "../../src/sdk/auth/TokenExchangeParams";
import { TokenExchangeResponse } from "../../src/sdk/auth/TokenExchangeResponse";
import * as UberClientInfo from '../../src/config/uber-client.json';

let httpMock: HttpMock;
let authService: AuthService;
let { clientId, clientSecret } = UberClientInfo;

httpMock = new HttpMock();
authService = new AuthService(httpMock);

testGetAuthUrl();
testTokenExchange()

function testGetAuthUrl() {
    console.log('getAuthUrl()');
    let authUrl = authService.getAuthUrl('clientId');
    let expectation = 'https://login.uber.com/oauth/v2/authorize?response_type=code&client_id=clientId&scope=request+ride_widgets&redirect_uri=https://github.com/kheidrich/uberocket';
    console.assert(authUrl === expectation, 'wrong auth url');
}

async function testTokenExchange() {
    console.log('tokenExchange()');
    let params: TokenExchangeParams;
    let exchangeResponse: TokenExchangeResponse;

    params = { clientId, clientSecret, code: 'crd.EA.CAESELEY-TnC_00Pso-aIilrT7wiATE.ffhqqZN4OkqxsyXqB4GJXpv7oXQ13wqAcM4e_c0HKTs#_' };
    exchangeResponse = await authService.tokenExchange(params);
    console.log(exchangeResponse);
}
