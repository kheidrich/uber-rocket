export interface RideEstimation {
	productId: string,
	productName: string,
	highEstimate: number,
	lowEstimate: number,
	currency: string,
	distance: number,
	extimatedTimeToArrive: number
}