import { IChatCommand } from '../IChatCommand';

export class RequestCommand implements IChatCommand {
	
	execute(params: Map<string, string>): Promise<any> {
		throw new Error("Method not implemented.");
	}

}