import { RequestCommand } from './commands/RequestCommand';
import { IChatCommand } from './IChatCommand';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { CommandParser } from './CommandParser';
import { IRead, IModify, IHttp, IPersistence } from '@rocket.chat/apps-engine/definition/accessors';

export class CommandExecuter implements ISlashCommand {
	private commandParser: CommandParser;
	private selectedCommand: IChatCommand;
	public command = 'uberocket';
	public i18nParamsExample = 'uber_rocket_params_example';
	public i18nDescription = 'uber_rocket_cmd_description';
	public providesPreview = false;

	private cloneParams(context: SlashCommandContext): Array<string> {
		return context.getArguments().slice();
	}

	public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
		this.commandParser = new CommandParser(http);
		const params: Array<string> = this.cloneParams(context);
		const command = params[0];
		console.log(params)
		params.shift();
		this.selectedCommand = this.commandParser.parse(command);
		this.selectedCommand.execute(params);
	}
}