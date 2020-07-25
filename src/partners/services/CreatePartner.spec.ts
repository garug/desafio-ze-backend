import { isUuid } from 'uuidv4';

import CreatePartner from './CreatePartner';
import MockPartnerRepository from '../repositories/MockPartnerRepository';
import MockPartner from '../entities/MockPartner';
import ValidatePartner from './ValidatePartner';
import NegocioError from '../../errors/NegocioError';

jest.mock('./ValidatePartner');

const partner = new MockPartner();
let repository: MockPartnerRepository;
let validate: ValidatePartner;

beforeAll(() => {
    ValidatePartner.prototype.validateForCreate = jest
        .fn()
        .mockImplementation(() => []);
    repository = new MockPartnerRepository();
    validate = new ValidatePartner(repository);
});

beforeEach(() => {
    repository.partners = [];
});

describe('CreatePartner', () => {
    it('should be able to create a new partner', async () => {
        const createPartner = new CreatePartner(repository, validate);
        await createPartner.create(partner);
        expect(await repository.findById(partner.id)).toBe(partner);
    });

    it('should throw error if validation return any error', async () => {
        ValidatePartner.prototype.validateForCreate = jest
            .fn()
            .mockImplementationOnce(() => ['with this error']);
        const specificValidate = new ValidatePartner(repository);
        const createPartner = new CreatePartner(repository, specificValidate);
        await expect(createPartner.create(partner)).rejects.toThrow(
            NegocioError,
        );
    });

    it('should add a valid uuid to id when receive a partner without id', async () => {
        const createPartner = new CreatePartner(repository, validate);
        partner.id = '';
        const savedPartner = await createPartner.create(partner);
        expect(savedPartner).toHaveProperty('id');
        expect(isUuid(savedPartner.id)).toBe(true);
    });
});
