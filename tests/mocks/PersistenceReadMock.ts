import { IPersistenceRead } from "@rocket.chat/apps-engine/definition/accessors";
import { RocketChatAssociationRecord } from "@rocket.chat/apps-engine/definition/metadata";

export class PersistenceReadMock implements IPersistenceRead {
    public async read(id: string): Promise<object> {
        return {};
    }

    public async readByAssociation(association: RocketChatAssociationRecord): Promise<object[]> {
        return [];
    }

    public async readByAssociations(associations: RocketChatAssociationRecord[]): Promise<object[]> {
        return [];
    }
}