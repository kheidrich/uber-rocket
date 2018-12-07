// import { RideRequestParams } from './RiderRequestParams';
import { RideEstimation } from './RideEstimation';
import { Route } from './Route';
import { IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { Address } from '../Address';
// import { RideTypes } from './RideTypes';

export class RideService {
	private http: IHttp;

	constructor(http: IHttp) {
		this.http = http;
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