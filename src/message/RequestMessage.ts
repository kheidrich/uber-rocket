import { RideEstimation } from './../sdk/ride/RideEstimation';
import { IFormattedMessage } from './IFormattedMessage';

export class RequestMessage implements IFormattedMessage {
	private message: string = '';

	constructor() {
		this.message = '';
	}

	setMessage(estimations: Array<RideEstimation>) {
		this.message = estimations.reduce((accumulator, estimation, index) => {
			accumulator += `Product : ${ estimation.productName }\nPrice: ${ estimation.currency } ${ estimation.lowEstimate } ~ ${ estimation.highEstimate }\nDistance ${ estimation.distance }KM\nETA: ${ estimation.estimatedTimeToArrive } minutes\n\n`;
			return accumulator;
		}, this.message);
	}

	getFormatedMessage(): string {
		return `\`\`\`\`${ this.message } \`\`\``;
	}

}