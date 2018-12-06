import { CommandParser } from './CommandParser';

export class CommandExecuter {
	private commandParser: CommandParser;

	constructor(commandParser: CommandParser) {
		this.commandParser = commandParser;
	}
}