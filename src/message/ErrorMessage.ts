import { IFormattedMessage } from "./IFormattedMessage";

export class ErrorMessage implements IFormattedMessage {
    private error: string;

    public setError(value: string){
        this.error = value;
    }

    public getFormatedMessage(): string {
        return `Error: ${this.error}`;
    }
}