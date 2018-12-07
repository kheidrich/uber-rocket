import { IChatCommand } from "../IChatCommand";
import { IFormattedMessage } from "../../message/IFormattedMessage";
import { AuthService } from "../../sdk/auth/AuthService";
import { SessionService } from "../../sdk/SessionService";
import { AuthorizationSuccessMessage } from "../../message/AuthorizationSuccessMessage";
import UberClientInfo from "../../config/UberClientInfo";
import { TokenExchangeResponse } from "../../sdk/auth/TokenExchangeResponse";
import { AccessToken } from "../../sdk/auth/AccessToken";
import { ErrorMessage } from "../../message/ErrorMessage";

export class AuthorizeCommand implements IChatCommand {
    private authService: AuthService;
    private sessionService: SessionService;

    constructor(
        authService: AuthService,
        sessionService: SessionService
    ) {
        this.authService = authService;
        this.sessionService = sessionService;
    }

    public async execute(params: Array<string>): Promise<IFormattedMessage> {
        let code = params[2];
        let { clientId, clientSecret } = UberClientInfo;
        let tokenExchange: TokenExchangeResponse;

        try {
            tokenExchange = await this.authService.tokenExchange({clientId, clientSecret, code});
           
            this.sessionService.setRefreshToken(tokenExchange.refreshToken);
            this.sessionService.setAccessToken({token: tokenExchange.accessToken, expirationDate: tokenExchange.expirationDate});

            return new AuthorizationSuccessMessage();
        } catch(err) {
            let error = new ErrorMessage();

            console.log(err);
            error.setError('Could not authorize app, try again');

            return error;
        }
    }
}