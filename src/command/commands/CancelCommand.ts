import { IChatCommand } from '../IChatCommand';

export class CancelCommand implements IChatCommand {
	execute(params: Map<string, string>): Promise<any> {
		throw new Error("Method not implemented.");
	}

}