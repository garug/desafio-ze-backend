import mongoose, { Schema, Document } from 'mongoose';
// eslint-disable-next-line import/no-unresolved
import { MultiPolygon, Point } from 'geojson';
import IPartner from '../../../partners/entities/IPartner';

interface IPartnerSchema extends Document, IPartner {
    id: string;
    tradingName: string;
    ownerName: string;
    document: string;
    coverageArea?: MultiPolygon;
    address?: Point;
}

const PartnerSchema = new Schema({
    id: { type: String, required: true, unique: true },
    tradingName: { type: String, required: true },
    ownerName: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    coverageArea: { type: Object, index: '2dsphere' },
    address: { type: Object, index: '2dsphere' },
});

const PartnerModel = mongoose.model<IPartnerSchema>('Partner', PartnerSchema);

export { IPartnerSchema, PartnerModel };
