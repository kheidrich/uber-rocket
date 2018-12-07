import { RideService } from './../sdk/RideService';
import { IHttp, IPersistence, IModify, IPersistenceRead } from '@rocket.chat/apps-engine/definition/accessors';
import { CancelCommand } from './commands/CancelCommand';
import { ConfirmCommand } from './commands/ConfirmCommand';
import { RequestCommand } from './commands/RequestCommand';
import { InvalidCommand } from './commands/InvalidCommand';
import { CommandTypes } from './commands/CommandTypes';
import { IChatCommand } from './IChatCommand';
import { HelpCommand } from './commands/HelpCommand';
import { GeocodingService } from '../sdk/GeocodingService';
import { LoginCommand } from './commands/LoginCommand';
import { AuthService } from '../sdk/auth/AuthService';
import { AuthorizeCommand } from './commands/AuthorizeCommand';
import { SessionService } from '../sdk/SessionService';

export class CommandParser {
    private http: IHttp;
    private writePersistence: IPersistence;
    private readPersistence: IPersistenceRead;

    constructor(http: IHttp, writePersistence: IPersistence, readPersistence: IPersistenceRead) {
        this.http = http;
        this.writePersistence = writePersistence;
        this.readPersistence = readPersistence;
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
            [CommandTypes.CONFIRM]: () => new ConfirmCommand(this.http, this.writePersistence),
            [CommandTypes.CANCEL]: () => new CancelCommand(this.http, this.writePersistence),
            [CommandTypes.HELP]: () => new HelpCommand(),
            [CommandTypes.LOGIN]: () => new LoginCommand(new AuthService(this.http)),
            [CommandTypes.AUTHORIZE]: () => new AuthorizeCommand(new AuthService(this.http), new SessionService(this.writePersistence, this.readPersistence))
        }

        return actions[command]();
    }

}