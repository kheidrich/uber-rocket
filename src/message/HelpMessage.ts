import { IFormattedMessage } from './IFormattedMessage';

export class HelpMessage implements IFormattedMessage {
	private requestMessage: string = '/request from address(e.g. 3617-3515 Crawford St) to address(e.g. 1599-1501 Bell St).';
	private confirmMessgae: string = '/confirm uber product(e.g uberX the product that is available in your ride request) NOTE: you will confirm always the last request.';
	private cancelMessage: string = '/cancel (You  will cancel the last one ride requested).';
	private welcomeMessage: string = 'Welcome to the Uberocket. You can execute the commands described below and call your ~rocket~ uber ride.';

	getFormatedMessage(): string {
		return `${ this.welcomeMessage } \`\`\`${ this.requestMessage } \n${ this.confirmMessgae } \n${ this.cancelMessage }\`\`\``;
	}
}
