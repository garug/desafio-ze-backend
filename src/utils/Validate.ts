// eslint-disable-next-line import/no-unresolved
import { GeoJsonObject, Point } from 'geojson';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const geojsonValidation = require('geojson-validation');

export function validatePoint(object: GeoJsonObject): Array<string> {
    const libValidation = geojsonValidation.isPoint(object);
    if (!libValidation) {
        return ['Its not a valid point'];
    }

    const point = <Point>object;
    const invalidCoordinate = point.coordinates.some(e => Number.isNaN(e));
    if (invalidCoordinate) {
        return ['Need a valid latitude and longitude'];
    }

    return [];
}

export function validateMultipolygon(object: GeoJsonObject): Array<string> {
    const libValidation = geojsonValidation.isMultiPolygon(object);
    if (!libValidation) {
        return ['Its not a valid point'];
    }
    return [];
}
