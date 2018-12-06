export interface IChatCommand {
	execute(params: Map<string, string>): Promise<any>;
}