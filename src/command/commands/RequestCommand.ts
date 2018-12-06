import { IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { GeocodingService } from './../../sdk/GeocodingService';
import { Address } from './../../sdk/Address';
import { RideService } from './../../sdk/RideService';
import { IFormattedMessage } from './../../message/IFormattedMessage';
import { IChatCommand } from '../IChatCommand';

export class RequestCommand implements IChatCommand {
	private rideService: RideService;
	private geocodingService: GeocodingService;

	constructor(http: IHttp){
		this.rideService = new RideService(http);
		this.geocodingService = new GeocodingService(http);
	}

	async execute(params: Array<string>): Promise<any> {
		//const options = { origin: params.get('from'), destination: params.get('to') } as Address;
		try {
			const from = await this.geocodingService.getCoordinates(options.origin);
			const to = await this.geocodingService.getCoordinates(options.destination);
			console.log(from)
			console.log(to)
		} catch (error) {

		}

	}

}