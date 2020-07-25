import { injectable, inject } from 'tsyringe';
// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';

import { validatePoint } from '../../utils/Validate';
import NegocioError from '../../errors/NegocioError';
import IPartner from '../entities/IPartner';
import IPartnerRepository from '../repositories/IPartnerRepository';

@injectable()
export default class FindPartner {
    constructor(
        @inject('PartnerRepository') private repository: IPartnerRepository,
    ) {}

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
