import { IFormattedMessage } from './../message/IFormattedMessage';

export interface IChatCommand {
	execute(params: Array<string>): Promise<IFormattedMessage>;
}