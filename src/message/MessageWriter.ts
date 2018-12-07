import { SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IFormattedMessage } from './IFormattedMessage';
import { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';

export class MessageWriter {
	private modify: IModify;
	private read: IRead;
	private context: SlashCommandContext;

	constructor(context: SlashCommandContext, modify: IModify, read: IRead) {
		this.modify = modify;
		this.read = read;
		this.context = context;
	}

	async writeMessage(message: string): Promise<void> {
		try {
			const sender = await this.read.getUserReader().getById('rocket.cat');
			const room = this.context.getRoom();

			const builder = this.modify
				.getNotifier()
				.getMessageBuilder();
			const msg = this.modify
				.getCreator()
				.startMessage()
				.setRoom(room)
				.setGroupable(false)
				.setSender(sender)
				.setText(message);

			this.modify.getNotifier().notifyUser(this.context.getSender(), msg.getMessage());
		} catch (error) {

		}

	}
}