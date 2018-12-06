import { Address } from './Address';
import { RideTypes } from './RideTypes';

export class RideService {
	estimate(address: Address): Promise<any>{
		return Promise.resolve();
	}

	request(address: Address, ride: RideTypes): Promise<any>{
		return Promise.resolve();
	}

	cancel() {

	}
}