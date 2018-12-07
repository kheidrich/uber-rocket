import { HttpMock } from "../mocks/HttpMock";
import { RideService } from "../../src/sdk/ride/RideService";
import { SessionServiceMock } from "../mocks/SessionServiceMock";

let httpMock: HttpMock;
let rideService: RideService;
let sessionService: SessionServiceMock;

httpMock = new HttpMock();
sessionService = new SessionServiceMock();
rideService = new RideService(httpMock, sessionService)

async function testEstimate(){
    console.log('estimate()');
    let estimations = [];
}