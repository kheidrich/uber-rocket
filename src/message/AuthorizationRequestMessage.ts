import { IFormattedMessage } from "./IFormattedMessage";

export class AuthorizationRequestMessage implements IFormattedMessage {
    private authUrl: string;

    public setAuthUrl(value: string) {
        this.authUrl = value;
    }

    public getFormatedMessage(): string {
        return `Please, authorize our app using the link below:
            ${this.authUrl}
        `;
    }
}