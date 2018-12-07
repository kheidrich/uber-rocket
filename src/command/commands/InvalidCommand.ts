import { IFormattedMessage } from '../../message/IFormattedMessage';

export class InvalidCommand implements IFormattedMessage {

	getFormatedMessage(): string {
		return `It seems you typed an invalid command to Uberocket. =/`;
	}

}
