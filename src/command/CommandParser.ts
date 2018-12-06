import { IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { CancelCommand } from './commands/CancelCommand';
import { ConfirmCommand } from './commands/ConfirmCommand';
import { RequestCommand } from './commands/RequestCommand';
import { InvalidCommand } from './commands/InvalidCommand';
import { CommandsEnum } from './commands/CommandsEnum';
import { IChatCommand } from './IChatCommand';
import { HelpCommand } from './commands/HelpCommand';

export class CommandParser {
    private http: IHttp;

    constructor(http: IHttp) {
        this.http = http;
    }

    private isValidCommand(command: string): Boolean {
        return command === undefined || Object.values(CommandsEnum).includes(command);
    }

    parse(command: string): IChatCommand {
        if (!this.isValidCommand(command)) {
            throw new InvalidCommand();
        }
        const actions = {
            [CommandsEnum.REQUEST]: () => new RequestCommand(this.http),
            // [CommandsEnum.CONFIRM]: () => new ConfirmCommand(this.http),
            // [CommandsEnum.CANCEL]: () => new CancelCommand(this.http),
            // [CommandsEnum.HELP]: () => new HelpCommand(this.http),
        }

        return actions[command]();
    }

}