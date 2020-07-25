// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';

import IPartner from '../entities/IPartner';

export default interface IPartnerRepository {
    save(partner: IPartner): Promise<IPartner>;
    findById(id: string): Promise<IPartner | undefined>;
    findByDocument(document: string): Promise<IPartner | undefined>;
    findBySpecificLocation(point: Point): Promise<Array<IPartner>>;
}
