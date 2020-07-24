import { v4 as uuid } from 'uuid';

// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';
import { IPartner } from './PartnerModel';

interface IPartnerFilter {
    limit?: number;
    distance?: number;
    point: Point;
}

export default class PartnerRepository {
    private saved: Array<IPartner> = [];

    public async findById(id: string): Promise<IPartner | undefined> {
        return this.saved.find(partner => partner.id === id);
    }

    public async save(partner: IPartner): Promise<IPartner> {
        partner.id = partner.id || uuid();
        this.saved.push(partner);
        return partner;
    }

    public async findAll(): Promise<Array<IPartner>> {
        return this.saved;
    }

    public async findNearest(filter: IPartnerFilter): Promise<Array<IPartner>> {
        console.log(filter);
        return this.saved;
    }
}
