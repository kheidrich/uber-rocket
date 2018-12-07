import { RideService } from './../sdk/RideService';
import { IHttp, IPersistence, IModify } from '@rocket.chat/apps-engine/definition/accessors';
import { CancelCommand } from './commands/CancelCommand';
import { ConfirmCommand } from './commands/ConfirmCommand';
import { RequestCommand } from './commands/RequestCommand';
import { InvalidCommand } from './commands/InvalidCommand';
import { CommandsEnum } from './commands/CommandsEnum';
import { IChatCommand } from './IChatCommand';
import { HelpCommand } from './commands/HelpCommand';
import { GeocodingService } from '../sdk/GeocodingService';

export class CommandParser {
    private http: IHttp;
    private persistence: IPersistence;

    constructor(http: IHttp, persistence: IPersistence) {
        this.http = http;
        this.persistence = persistence;
    }

    private isValidCommand(command: string): Boolean {
        return command === undefined || Object.values(CommandsEnum).includes(command);
    }

    parse(command: string): IChatCommand {
        if (!this.isValidCommand(command)) {
            throw new InvalidCommand();
        }
        const actions = {
            [CommandsEnum.REQUEST]: () => new RequestCommand(new GeocodingService(this.http), new RideService(this.http)),
            [CommandsEnum.CONFIRM]: () => new ConfirmCommand(this.http, this.persistence),
            [CommandsEnum.CANCEL]: () => new CancelCommand(this.http, this.persistence),
            [CommandsEnum.HELP]: () => new HelpCommand(),
        }

        return actions[command]();
    }

}