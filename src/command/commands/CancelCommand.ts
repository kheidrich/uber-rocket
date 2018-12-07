import { IHttp, IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
import { InvalidCommand } from './InvalidCommand';
import { IChatCommand } from '../IChatCommand';

export class CancelCommand implements IChatCommand {
	private http: IHttp;
	private persistence: IPersistence;

	constructor(http: IHttp, persistence: IPersistence) {
		this.persistence = persistence;
	}

	private validateParameters(params: Array<string>): void {
		if (!params.length || params.length > 1) {
			throw new InvalidCommand();
		}
	}

	async execute(params: Array<string>): Promise<any> {
		try {
			this.validateParameters(params);
		} catch (error) {

		}
	}

}