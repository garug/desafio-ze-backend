// eslint-disable-next-line import/no-unresolved
import { MultiPolygon, Point } from 'geojson';

export default interface IPartner {
    id?: string;
    tradingName: string;
    ownerName: string;
    document: string;
    coverageArea?: MultiPolygon;
    address?: Point;
}
