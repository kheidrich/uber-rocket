import { IPersistence } from "@rocket.chat/apps-engine/definition/accessors";
import { RocketChatAssociationRecord } from "@rocket.chat/apps-engine/definition/metadata";

export class PersistenceMock implements IPersistence {
    async create(data: object): Promise<string> {
        return '';
    }

    async createWithAssociation(data: object, association: RocketChatAssociationRecord): Promise<string> {
        return '';
    }

    async createWithAssociations(data: object, associations: RocketChatAssociationRecord[]): Promise<string> {
        return '';
    }

    async update(id: string, data: object): Promise<string> {
        return '';
    }

    async updateByAssociation(association: RocketChatAssociationRecord, data: object): Promise<string> {
        return '';
    }

    async remove(id: string): Promise<object> {
        return {};
    }

    async removeByAssociation(association: RocketChatAssociationRecord): Promise<object[]> {
        return [];
    }

    async removeByAssociations(associations: RocketChatAssociationRecord[]): Promise<object[]> {
        return [];
    }
}