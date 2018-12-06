export interface IChatCommand {
	execute(params: Array<string>): Promise<any>;
}