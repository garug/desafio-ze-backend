// eslint-disable-next-line import/no-unresolved
import { MultiPolygon, Point } from 'geojson';

import IPartner from './IPartner';

export default class MockPartner implements IPartner {
    id: string;

    tradingName: string;

    ownerName: string;

    document: string;

    coverageArea?: MultiPolygon | undefined;

    address?: Point | undefined;

    constructor() {
        this.id = '1';
        this.tradingName = 'Adega da Cerveja - Pinheiros';
        this.ownerName = 'Zé da Silva';
        this.document = '1432132123891/0001';
        this.coverageArea = {
            type: 'MultiPolygon',
            coordinates: [
                [
                    [
                        [30, 20],
                        [45, 40],
                        [10, 40],
                        [30, 20],
                    ],
                ],
                [
                    [
                        [15, 5],
                        [40, 10],
                        [10, 20],
                        [5, 10],
                        [15, 5],
                    ],
                ],
            ],
        };
        this.address = {
            type: 'Point',
            coordinates: [-46.57421, -21.785741],
        };
    }
}
