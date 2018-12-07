import { AccessToken } from "./auth/AccessToken";
import { IPersistence, IPersistenceRead } from "@rocket.chat/apps-engine/definition/accessors";
import { RocketChatAssociationModel, RocketChatAssociationRecord } from "@rocket.chat/apps-engine/definition/metadata";

export class SessionService {
    private writePersistence: IPersistence;
    private readPersistence: IPersistenceRead;

    constructor(writePersistence: IPersistence, readPersistence: IPersistenceRead) {
        this.writePersistence = writePersistence;
        this.readPersistence = readPersistence;
    }

    public async getAccessToken(): Promise<AccessToken | undefined> {
        let association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'accessToken');
        let token = ((await this.readPersistence.readByAssociation(association)) as any);

        if (!token[0] || !token[0].id)
            return undefined;

        return (await this.readPersistence.read(token[0].id) as AccessToken);
    }

    public async setAccessToken(value: AccessToken) {
        let tokenExists = !!(await this.getAccessToken());
        let association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'accessToken');
        let id;

        if (!tokenExists) {
            id = await this.writePersistence.create(value)
            this.writePersistence.createWithAssociation({ id }, association);
        }
        else {
            let actualId = ((await this.readPersistence.readByAssociation(association))[0] as any);
            id = await this.writePersistence.update(actualId, value)
            this.writePersistence.updateByAssociation(association, { id });
        }
    }

    public async getRefreshToken(): Promise<string | undefined> {
        let association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'refreshToken');
        let token = ((await this.readPersistence.readByAssociation(association)) as any);

        if (!token[0] || !token[0].id)
            return undefined;

        return (await this.readPersistence.read(token[0].id) as any).token;
    }

    public async setRefreshToken(value: string) {
        let tokenExists = !!(await this.getAccessToken());
        let association = new RocketChatAssociationRecord(RocketChatAssociationModel.MISC, 'refreshT0oken');
        let id;

        if (!tokenExists) {
            id = await this.writePersistence.create({ token: value })
            this.writePersistence.createWithAssociation({ id }, association);
        }
        else {
            let actualId = ((await this.readPersistence.readByAssociation(association))[0] as any);
            id = await this.writePersistence.update(actualId, {token: value})
            this.writePersistence.updateByAssociation(association, { id });
        }
    }

    public async accessTokenIsValid(): Promise<boolean> {
        return true;
    }
}