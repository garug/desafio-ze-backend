import { injectable } from 'tsyringe';
// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';

import { validatePoint } from '../../utils/Validate';
import NegocioError from '../../NegocioError';
import { IPartner } from '../repositories/PartnerSchema';
import PartnerRepository from '../repositories/PartnerRepository';

@injectable()
export default class FindPartner {
    constructor(private repository: PartnerRepository) {}

    async byId(id: string): Promise<IPartner | undefined> {
        return this.repository.findById(id);
    }

    async nearest(point: Point): Promise<Array<IPartner>> {
        const errors = validatePoint(point);
        if (errors.length > 0) {
            throw new NegocioError(errors);
        }
        return this.repository.findBySpecificLocation(point);
    }
}
