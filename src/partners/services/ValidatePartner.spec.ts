import { uuid } from 'uuidv4';
// eslint-disable-next-line import/no-unresolved
import { Point, MultiPolygon } from 'geojson';

import MockPartner from '../entities/MockPartner';
import MockPartnerRepository from '../repositories/MockPartnerRepository';
import ValidatePartner from './ValidatePartner';

const partner = new MockPartner();
let repository: MockPartnerRepository;

beforeAll(() => {
    repository = new MockPartnerRepository();
    repository.partners.push(partner);
});

describe('ValidatePartner', () => {
    it('should valid if partner has unique id', async () => {
        const validatePartner = new ValidatePartner(repository);
        const invalidPartner = await validatePartner.hasUniqueId(partner);
        expect(invalidPartner).toBeFalsy();

        const cpPartner = { ...partner, id: uuid() };
        const validPartner = await validatePartner.hasUniqueId(cpPartner);
        expect(validPartner).toBeTruthy();
    });

    it('should valid if partner has unique document', async () => {
        const validatePartner = new ValidatePartner(repository);
        const invalidPartner = await validatePartner.hasUniqueDocument(partner);
        expect(invalidPartner).toBeFalsy();

        const cpPartner = { ...partner, document: uuid() };
        const validPartner = await validatePartner.hasUniqueDocument(cpPartner);
        expect(validPartner).toBeTruthy();
    });

    it('should valid if partner has valid address', () => {
        const validatePartner = new ValidatePartner(repository);
        const validPartner = validatePartner.hasValidAddress(partner);
        expect(validPartner).toBeTruthy();

        const partnerWithoutAddress = { ...partner, address: undefined };
        const invalidPartner = validatePartner.hasValidAddress(
            partnerWithoutAddress,
        );
        expect(invalidPartner).toBeFalsy();
    });

    it('should valid if partner has invalid point in address', () => {
        const point: Point = {
            type: 'Point',
            coordinates: [NaN, NaN],
        };
        const validatePartner = new ValidatePartner(repository);
        const partnerWithInvalidPoint = { ...partner, address: point };
        const validPartner = validatePartner.hasValidAddress(
            partnerWithInvalidPoint,
        );
        expect(validPartner).toBeFalsy();
    });

    it('should valid if partner has valid coverage area', () => {
        const validatePartner = new ValidatePartner(repository);
        const validPartner = validatePartner.hasValidCoverageArea(partner);
        expect(validPartner).toBeTruthy();

        const partnerWithoutAddress = { ...partner, coverageArea: undefined };
        const invalidPartner = validatePartner.hasValidCoverageArea(
            partnerWithoutAddress,
        );
        expect(invalidPartner).toBeFalsy();
    });

    it('should valid if partner has invalid coverage area', () => {
        const area: MultiPolygon = {
            type: 'MultiPolygon',
            coordinates: [
                [
                    [
                        [NaN, NaN],
                        [NaN, NaN],
                        [NaN, NaN],
                    ],
                ],
            ],
        };
        const validatePartner = new ValidatePartner(repository);
        const partnerWithInvalidPoint = { ...partner, coverageArea: area };
        const validPartner = validatePartner.hasValidCoverageArea(
            partnerWithInvalidPoint,
        );
        expect(validPartner).toBeFalsy();
    });

    describe('Validate a partner for create', () => {
        it('should return 0 messages if a valid partner', async () => {
            const validatePartner = new ValidatePartner(repository);
            const validPartner = { ...partner, id: uuid(), document: uuid() };
            const errors = await validatePartner.validateForCreate(
                validPartner,
            );
            expect(errors.length).toBe(0);
        });

        it('should return msg if document already registered', async () => {
            const validatePartner = new ValidatePartner(repository);
            const cpPartner = { ...partner, id: uuid() };
            const errors = await validatePartner.validateForCreate(cpPartner);
            expect(errors.length).toBe(1);
            expect(errors).toContain('This document already registered');
        });

        it('should return msg if document already registered', async () => {
            const validatePartner = new ValidatePartner(repository);
            const cpPartner = { ...partner, document: uuid() };
            const errors = await validatePartner.validateForCreate(cpPartner);
            expect(errors.length).toBe(1);
            expect(errors).toContain('This id already saved');
        });

        it('should return msg if not have a valid address', async () => {
            const validatePartner = new ValidatePartner(repository);
            const cpPartner = {
                ...partner,
                document: uuid(),
                id: uuid(),
                address: undefined,
            };
            const errors = await validatePartner.validateForCreate(cpPartner);
            expect(errors.length).toBe(1);
            expect(errors).toContain("'address' is not a valid GeoJSON Point");
        });

        it('should return msg if not have a valid coverage area', async () => {
            const validatePartner = new ValidatePartner(repository);
            const cpPartner = {
                ...partner,
                document: uuid(),
                id: uuid(),
                coverageArea: undefined,
            };
            const errors = await validatePartner.validateForCreate(cpPartner);
            expect(errors.length).toBe(1);
            expect(errors).toContain(
                "'coverageArea' is not a valid GeoJSON Multipolygon",
            );
        });
    });
});
