import { AuthService } from "../../src/sdk/auth/AuthService";
import { HttpMock } from "../mocks/HttpMock";
import { TokenExchangeParams } from "../../src/sdk/auth/TokenExchangeParams";
import { TokenExchangeResponse } from "../../src/sdk/auth/TokenExchangeResponse";
import UberClientInfo from "../../src/config/UberClientInfo";
import { RefreshAccessTokenParams } from "../../src/sdk/auth/RefreshAccessTokenParams";
import { RefreshAccessTokenResponse } from "../../src/sdk/auth/RefreshAccessTokenResponse";

let httpMock: HttpMock;
let authService: AuthService;
let { clientId, clientSecret } = UberClientInfo;

httpMock = new HttpMock();
authService = new AuthService(httpMock);

testGetAuthUrl();
divisor();
// testTokenExchange();
// divisor();
testRefreshToken();

function testGetAuthUrl() {
    console.log('getAuthUrl()');
    let authUrl = authService.getAuthUrl('kevin.id');
    console.log(authUrl);
}

async function testTokenExchange() {
    console.log('tokenExchange()');
    let params: TokenExchangeParams;
    let response: TokenExchangeResponse;

    params = { clientId, clientSecret, code: 'crd.EA.CAESELEY-TnC_00Pso-aIilrT7wiATE.ffhqqZN4OkqxsyXqB4GJXpv7oXQ13wqAcM4e_c0HKTs#_' };
    response = await authService.tokenExchange(params);
    console.log(response);
}

async function testRefreshToken() {
    console.log('refreshToken()');
    let params: RefreshAccessTokenParams;
    let response: RefreshAccessTokenResponse;

    params = { clientId, clientSecret, refreshToken: 'MA.CAESEIONX9o_KU4rpZ06nRSy6cciATEoATIBMQ.yZfEPlcZdNFBBO3uvG1c9dhS-XPZbWsX1Ibni0P1suM.OoCRnRUdGqc5a8MFppAqhimzqJpyPlJunMJH_I4jZ_I' }
    response = await authService.refreshAccessToken(params);
    console.log(response);
}

function divisor() {
    console.log('------------------------------------');
}