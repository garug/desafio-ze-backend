// eslint-disable-next-line import/no-unresolved
import { Point } from 'geojson';

import MockPartnerRepository from '../repositories/MockPartnerRepository';
import MockPartner from '../entities/MockPartner';
import FindPartner from './FindPartner';
import NegocioError from '../../errors/NegocioError';

let repository: MockPartnerRepository;
const partner = new MockPartner();
const { id } = partner;

beforeAll(() => {
    repository = new MockPartnerRepository();
    repository.partners.push(partner);
});

describe('FindPartner', () => {
    describe('byId', () => {
        it('should be able to return partner by id when exists', async () => {
            const findParner = new FindPartner(repository);
            const savedPartner = await findParner.byId(id);
            expect(savedPartner).toBe(partner);
        });

        it('should be able to return undefined when id not exists', async () => {
            const findPartner = new FindPartner(repository);
            const savedPartner = await findPartner.byId('2');
            expect(savedPartner).toBe(undefined);
        });
    });

    describe('nearest for specific point', () => {
        it('should be able to return nearest partners', async () => {
            const point: Point = {
                type: 'Point',
                coordinates: [30, 40],
            };
            const findPartner = new FindPartner(repository);
            const nearest = await findPartner.nearest(point);
            expect(nearest).toBeInstanceOf(Array);
        });

        it('should throw error when point is invalid', async () => {
            const point: Point = {
                type: 'Point',
                coordinates: [NaN, NaN],
            };
            const findPartner = new FindPartner(repository);
            await expect(findPartner.nearest(point)).rejects.toThrowError(
                NegocioError,
            );
        });
    });
});
