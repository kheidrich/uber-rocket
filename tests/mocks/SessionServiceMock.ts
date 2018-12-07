import { SessionService } from "../../src/sdk/SessionService";
import { AccessToken } from "../../src/sdk/auth/AccessToken";
import { PersistenceMock } from "./PersistenceMock";
import { PersistenceReadMock } from "./PersistenceReadMock";

export class SessionServiceMock extends SessionService {
    private accessTokenMock: AccessToken;
    private refreshTokenMock: string;

    constructor() {
        let persistence = new PersistenceMock();
        let persistenceRead = new PersistenceReadMock();

        super(persistence, persistenceRead);
    }

    public setAccessTokenMock(mock: AccessToken) {
        this.accessTokenMock = mock;
    }

    public setRefreshTokenMock(mock: string) {
        this.refreshTokenMock = mock;
    }

    public async setAccessToken(value: AccessToken) {

    }

    public async setRefreshToken(value: string) {

    }

    public async getAccessToken(): Promise<AccessToken | undefined> {
        return this.accessTokenMock;
    };

    public async getRefreshToken(): Promise<string | undefined> {
        return this.refreshTokenMock;
    }
}