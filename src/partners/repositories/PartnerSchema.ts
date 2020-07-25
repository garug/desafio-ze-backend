import mongoose, { Schema, Document } from 'mongoose';
// eslint-disable-next-line import/no-unresolved
import { MultiPolygon, Point } from 'geojson';

interface IPartnerSchema extends Document {
    id: string;
    tradingName: string;
    ownerName: string;
    document: string;
    coverageArea?: MultiPolygon;
    address?: Point;
}

interface IPartner {
    id?: IPartnerSchema['id'];
    tradingName: IPartnerSchema['tradingName'];
    ownerName: IPartnerSchema['ownerName'];
    document: IPartnerSchema['document'];
    coverageArea?: IPartnerSchema['coverageArea'];
    address?: IPartnerSchema['address'];
}

const PartnerSchema = new Schema({
    id: { type: String, required: true, unique: true },
    tradingName: { type: String, required: true },
    ownerName: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    coverageArea: { type: Object, index: '2dsphere' },
    address: { type: Object, index: '2dsphere' },
});

const Partner = mongoose.model<IPartnerSchema>('Partner', PartnerSchema);

export { IPartner, Partner };
