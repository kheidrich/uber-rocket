import { CommandParser } from './src/command/CommandParser';
import { CommandExecuter } from './src/command/CommandExecuter';
import {
    ILogger, IConfigurationExtend, IHttp,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

export class UberocketApp extends App {
    private commandExecuter: CommandExecuter;

    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
    
        this.commandExecuter = new CommandExecuter();
    }

    public async initialize(configuration: IConfigurationExtend): Promise<void> {
        await configuration.slashCommands.provideSlashCommand(this.commandExecuter);
    }
}
