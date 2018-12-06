import { CancelCommand } from './commands/CancelCommand';
import { ConfirmCommand } from './commands/ConfirmCommand';
import { RequestCommand } from './commands/RequestCommand';
import { InvalidCommand } from './commands/InvalidCommand';
import { CommandsEnum } from './commands/CommandsEnum';
import { IChatCommand } from './IChatCommand';
import { HelpCommand } from './commands/HelpCommand';

export class CommandParser  {

    private isValidCommand(command: string): Boolean {
        return command === undefined || Object.values(CommandsEnum).includes(command);
    }

	parse(command: string): IChatCommand {
        console.log(CommandsEnum)
		if(!this.isValidCommand(command)){
            throw new InvalidCommand();
        }
        const actions = {
            [CommandsEnum.REQUEST]: () => new RequestCommand(),
            [CommandsEnum.CONFIRM]: () => new ConfirmCommand(),
            [CommandsEnum.CANCEL]: () => new CancelCommand(),
            [CommandsEnum.HELP]: () => new HelpCommand(),
        }

        return actions[command];
	}

}