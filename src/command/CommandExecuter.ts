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

	constructor(commandParser: CommandParser) {
		this.commandParser = commandParser;
	}

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
		const params: Array<string> = context.getArguments();
		const command = params[0];
		this.selectedCommand = this.commandParser.parse(command);
		console.log(this.selectedCommand)
		//this.selectedCommand.execute();	
    }
}