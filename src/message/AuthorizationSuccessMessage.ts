import { IFormattedMessage } from "./IFormattedMessage";

export class AuthorizationSuccessMessage implements IFormattedMessage {

    getFormatedMessage(): string {
        return 'Logged succesfuly!';
    }
}