import mongoose, { Schema, Document } from 'mongoose';
// eslint-disable-next-line import/no-unresolved
import { MultiPolygon, Point } from 'geojson';

export interface IPartner extends Document {
    id: string | undefined;
    tradingName: string;
    ownerName: string;
    document: string;
    coverageArea: MultiPolygon | undefined;
    address: Point | undefined;
}

const PartnerSchema = new Schema({
    id: { type: String, required: true, unique: true },
    tradingName: { type: String, required: true },
    ownerName: { type: String, required: true },
    document: { type: String, required: true },
    coverageArea: Schema.Types.Mixed,
    address: Schema.Types.Mixed,
});

export default mongoose.model<IPartner>('Partner', PartnerSchema);
