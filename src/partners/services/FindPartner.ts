import { injectable } from 'tsyringe';
// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';

import PartnerRepository from '../PartnerRepository';
import { IPartner } from '../PartnerModel';

@injectable()
export default class FindPartner {
    constructor(private repository: PartnerRepository) {}

    async byId(id: string): Promise<IPartner | undefined> {
        return this.repository.findById(id);
    }

    async nearest(point: Point): Promise<Array<IPartner>> {
        const filter = {
            limit: 10,
            distance: 500,
            point,
        };
        return this.repository.findNearest(filter);
    }
}
