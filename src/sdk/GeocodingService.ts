import { Coordinates } from './Coordinates';
import { IHttp } from '@rocket.chat/apps-engine/definition/accessors';
import { Address } from './Address';

export class GeocodingService {
	private http: IHttp;
	private openStreetGeocodingBaseUrl = 'https://nominatim.openstreetmap.org';
	private requestOptions = {
		headers: {
			'User-Agent': 'RC-APP',
		}
	}

	constructor(http: IHttp) {
		this.http = http;
	}

	async getCoordinates(address: string): Promise<Coordinates> {
		try {
			const response = await this.http.get(encodeURI(`${this.openStreetGeocodingBaseUrl}/?q=${ address }&format=json&limit=1`), this.requestOptions);
			if(response && response.data && response.data.length){
				return { latitude: response.data[0].lat, longitude: response.data[0].lon } as Coordinates;
			}
			throw new Error();
		} catch (error) {
			console.log(error)
			throw new Error();
		}
	}
}