import { CommandParser } from './src/command/CommandParser';
import { CommandExecuter } from './src/command/CommandExecuter';
import {
    ILogger, IConfigurationExtend,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

export class UberocketApp extends App {
    private commandExecuter: CommandExecuter;
    private commandParser: CommandParser;

    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
        
        this.commandParser = new CommandParser();
        this.commandExecuter = new CommandExecuter(this.commandParser);
    }

    public async initialize(configuration: IConfigurationExtend): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(this.commandExecuter);
    }
}
