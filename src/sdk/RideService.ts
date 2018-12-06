import { IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { Address } from './Address';
import { RideTypes } from './RideTypes';

export class RideService {
	private http: IHttp;

	constructor(http: IHttp) {
		this.http = http;
	}
	
	estimate(address: Address): Promise<any>{
		return Promise.resolve();
	}

	request(address: Address, ride: RideTypes): Promise<any>{
		return Promise.resolve();
	}

	cancel() {

	}
}