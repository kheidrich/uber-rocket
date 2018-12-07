import { IChatCommand } from "../IChatCommand";
import { IFormattedMessage } from "../../message/IFormattedMessage";
import { AuthService } from "../../sdk/auth/AuthService";
import { AuthorizationRequestMessage } from "../../message/AuthorizationRequestMessage";
import UberClientInfo from "../../config/UberClientInfo";

export class LoginCommand implements IChatCommand {
    private authService: AuthService;

    constructor (authService: AuthService) {
        this.authService = authService;
    }

    public async execute(params: Array<string>): Promise<IFormattedMessage> {
        let authorizationMessage = new AuthorizationRequestMessage();

        authorizationMessage.setAuthUrl(this.authService.getAuthUrl(UberClientInfo.clientId));

        return authorizationMessage;
    }
}