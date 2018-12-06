import { IFormattedMessage } from '../../message/IFormattedMessage';

export class InvalidCommand implements IFormattedMessage {

	getFormatedMessage(): string {
		throw new Error("Method not implemented.");
	}

}
