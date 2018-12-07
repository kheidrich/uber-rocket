import { RideRequestParams } from './RiderRequestParams';
import { RideEstimation } from './RideEstimation';
import { Route } from './Route';
import { IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { Address } from '../Address';
import { RideTypes } from './RideTypes';

export class RideService {
	private http: IHttp;

	constructor(http: IHttp) {
		this.http = http;
	}

	async estimate(address: Route): Promise<Array<RideEstimation>> {
		let estimation: Array<RideEstimation>;

		estimation = [{
			productId: '',
			productName: '',
			highEstimate: 0,
			lowEstimate: 0,
			currency: '',
			distance: 0.0,
			extimatedTimeToArrive: 0
		}]

		return estimation;
	}
}