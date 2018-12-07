import { RideService } from './../sdk/RideService';
import { IHttp, IPersistence, IModify } from '@rocket.chat/apps-engine/definition/accessors';
import { CancelCommand } from './commands/CancelCommand';
import { ConfirmCommand } from './commands/ConfirmCommand';
import { RequestCommand } from './commands/RequestCommand';
import { InvalidCommand } from './commands/InvalidCommand';
import { CommandTypes } from './commands/CommandTypes';
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
        return command === undefined || Object.values(CommandTypes).includes(command);
    }

    parse(command: string): IChatCommand {
        if (!this.isValidCommand(command)) {
            throw new InvalidCommand();
        }
        const actions = {
            [CommandTypes.REQUEST]: () => new RequestCommand(new GeocodingService(this.http), new RideService(this.http)),
            [CommandTypes.CONFIRM]: () => new ConfirmCommand(this.http, this.persistence),
            [CommandTypes.CANCEL]: () => new CancelCommand(this.http, this.persistence),
            [CommandTypes.HELP]: () => new HelpCommand(),
        }

        return actions[command]();
    }

}