import { injectable } from 'tsyringe';
// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';
import IPartnerRepository from '../../../../partners/repositories/IPartnerRepository';
import { PartnerModel, IPartnerSchema } from '../PartnerSchema';
import IPartner from '../../../../partners/entities/IPartner';

@injectable()
export default class PartnerRepository implements IPartnerRepository {
    async save(partner: IPartner): Promise<IPartnerSchema> {
        const casted = partner as IPartnerSchema;
        return PartnerModel.create(casted);
    }

    async findById(id: string): Promise<IPartnerSchema | undefined> {
        const savedPartner = await PartnerModel.findOne({ id });
        return savedPartner || undefined;
    }

    async findByDocument(
        document: string,
    ): Promise<IPartnerSchema | undefined> {
        const savedPartner = await PartnerModel.findOne({ document });
        return savedPartner || undefined;
    }

    async findBySpecificLocation(point: Point): Promise<Array<IPartnerSchema>> {
        return PartnerModel.find({
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
}
