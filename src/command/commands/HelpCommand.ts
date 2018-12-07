import { HelpMessage } from './../../message/HelpMessage';
import { InvalidCommand } from './InvalidCommand';
import { IChatCommand } from '../IChatCommand';

export class HelpCommand implements IChatCommand {

	private validateParameters(params: Array<string>): void {
		if (params.length) {
			throw new InvalidCommand();
		}
	}

	async execute(params: Array<string>): Promise<any> {
		try {
			this.validateParameters(params);
			return new HelpMessage();
		} catch (error) {
			
		}
	}

}