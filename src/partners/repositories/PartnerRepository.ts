import { injectable } from 'tsyringe';
// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';
import { Partner, IPartner } from './PartnerSchema';

@injectable()
export default class PartnerRepository {
    async save(partner: IPartner): Promise<IPartner> {
        return Partner.create(partner);
    }

    async findById(id: string): Promise<IPartner | undefined> {
        const savedPartner = await Partner.findOne({ id });
        return savedPartner || undefined;
    }

    async findByDocument(document: string): Promise<Array<IPartner>> {
        return Partner.find({ document });
    }

    async findBySpecificLocation(point: Point): Promise<Array<IPartner>> {
        return Partner.find({
            address: {
                $near: {
                    $geometry: point,
                },
            },
            coverageArea: {
                $geoIntersects: {
                    $geometry: point,
                },
            },
        });
    }

    async exists(partner: IPartner): Promise<boolean> {
        const { id } = partner;
        const exists = await Partner.findOne({ id }, 'id');
        return !!exists;
    }
}
