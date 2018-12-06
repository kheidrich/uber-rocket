import { CommandParser } from './src/command/CommandParser';
import { CommandExecuter } from './src/command/CommandExecuter';
import {
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';

export class UberocketApp extends App {
    constructor(info: IAppInfo, logger: ILogger) {
        super(info, logger);
        let commandExecuter: CommandExecuter;
        let commandParser: CommandParser;

        commandParser = new CommandParser();
        commandExecuter = new CommandExecuter(commandParser);
    }
}
