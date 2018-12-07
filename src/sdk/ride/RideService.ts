import { RideEstimation } from './RideEstimation';
import { Route } from './Route';
import { IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { SessionService } from '../SessionService';

export class RideService {
	private http: IHttp;
	private sessionService: SessionService;

	constructor(http: IHttp, sessionService: SessionService) {
		this.http = http;
		this.sessionService = sessionService;
	}

	async estimate(address: Route): Promise<Array<RideEstimation>> {
		let estimation: Array<RideEstimation>;

		estimation = [{
			productId: 'bdfbhsgdgfd',
			productName: 'UberX',
			highEstimate: 12,
			lowEstimate: 15,
			currency: 'BRL',
			distance: 2.5,
			estimatedTimeToArrive: 12.5
		},
		{
			productId: 'bdfbhsgdgfd',
			productName: 'UberX',
			highEstimate: 12,
			lowEstimate: 15,
			currency: 'BRL',
			distance: 2.5,
			estimatedTimeToArrive: 12.5
		},
		{
			productId: 'bdfbhsgdgfd',
			productName: 'UberX',
			highEstimate: 12,
			lowEstimate: 15,
			currency: 'BRL',
			distance: 2.5,
			estimatedTimeToArrive: 12.5
		}]

		return estimation;
	}
}