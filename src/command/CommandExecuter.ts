import { IFormattedMessage } from './../message/IFormattedMessage';
import { MessageWriter } from './../message/MessageWriter';
import { cloneArray } from './../helpers/array.helper';
import { RequestCommand } from './commands/RequestCommand';
import { IChatCommand } from './IChatCommand';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { CommandParser } from './CommandParser';
import { IRead, IModify, IHttp, IPersistence } from '@rocket.chat/apps-engine/definition/accessors';

export class CommandExecuter implements ISlashCommand {
	private commandParser: CommandParser;
	private selectedCommand: IChatCommand;
	private messageWriter: MessageWriter;
	public command = 'uberocket';
	public i18nParamsExample = 'uber_rocket_params_example';
	public i18nDescription = 'uber_rocket_cmd_description';
	public providesPreview = false;

	public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
		try {
			this.commandParser = new CommandParser(http, persis);
			this.messageWriter = new MessageWriter(context, modify, read);
			const params: Array<string> = cloneArray(context.getArguments());
			const command = params[0];
			params.shift();
			this.selectedCommand = this.commandParser.parse(command);
			const message: IFormattedMessage = await this.selectedCommand.execute(params);
			this.messageWriter.writeMessage(message.getFormatedMessage());
		} catch (error) {

		}
	}
}