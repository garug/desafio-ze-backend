import { injectable } from 'tsyringe';
// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';
import IPartnerRepository from './IPartnerRepository';
import IPartner from '../entities/IPartner';

@injectable()
export default class MockPartnerRepository implements IPartnerRepository {
    partners: Array<IPartner> = [];

    async save(partner: IPartner): Promise<IPartner> {
        this.partners.push(partner);
        return partner;
    }

    async findById(id: string): Promise<IPartner | undefined> {
        return this.partners.find(partner => partner.id === id);
    }

    async findByDocument(document: string): Promise<IPartner | undefined> {
        return this.partners.find(partner => partner.document === document);
    }

    async findBySpecificLocation(_point: Point): Promise<Array<IPartner>> {
        return this.partners;
    }
}
