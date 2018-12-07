import { cloneArray } from './../../helpers/array.helper';
import { InvalidCommand } from './InvalidCommand';
import { IPersistence } from '@rocket.chat/apps-engine/definition/accessors';
import { GeocodingService } from './../../sdk/GeocodingService';
import { RideService } from '../../sdk/ride/RideService';
import { IFormattedMessage } from './../../message/IFormattedMessage';
import { IChatCommand } from '../IChatCommand';

export class RequestCommand implements IChatCommand {
	private rideService: RideService;
	private geocodingService: GeocodingService;

	constructor(geocodingService: GeocodingService, rideService: RideService) {
		this.rideService = rideService;
		this.geocodingService = geocodingService;
	}

	private validateParameters(params: Array<string>): void {
		if (params.length <= 2) {
			throw new InvalidCommand();
		}
		const reservedWords = ['from', 'to'];
		const hasRequiredReservedWords = reservedWords.some(word => params.includes(word));
		const fromIsTheFirstWord = params[0] === 'from';
		const toIsTheSecondWord = params[1] === 'to';
		if (!hasRequiredReservedWords || !fromIsTheFirstWord || toIsTheSecondWord) {
			throw new InvalidCommand();
		}
	}

	private proccessParameters(params: Array<string>): Map<string, string> {
		const toIndex = params.findIndex(item => item === 'to');
		const howManyWordBetweenFromAndTwo = toIndex - 1;
		const fromParams = cloneArray(params).splice(1, howManyWordBetweenFromAndTwo);
		const toParams = cloneArray(params).splice(toIndex + 1, params.length);

		return new Map([['from', fromParams.join(' ')], ['to', toParams.join(' ')]]);
	}

	async execute(params: Array<string>): Promise<any> {
		try {
			this.validateParameters(params)
			const destination: Map<string, string> = this.proccessParameters(params);
			const from = await this.geocodingService.getCoordinates(destination.get('from') as string);
			const to = await this.geocodingService.getCoordinates(destination.get('to') as string);

		} catch (error) {
			console.log(error)
		}

	}

}