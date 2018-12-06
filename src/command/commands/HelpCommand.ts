import { IChatCommand } from '../IChatCommand';

export class HelpCommand implements IChatCommand  {
	execute(params: Array<string>): Promise<any> {
		throw new Error("Method not implemented.");
	}

}