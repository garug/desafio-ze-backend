import { injectable, inject } from 'tsyringe';
import { uuid } from 'uuidv4';

import ValidatePartner from './ValidatePartner';
import NegocioError from '../../errors/NegocioError';
import IPartner from '../entities/IPartner';
import IPartnerRepository from '../repositories/IPartnerRepository';

@injectable()
export default class CreatePartner {
    constructor(
        @inject('PartnerRepository') private repository: IPartnerRepository,
        private validate: ValidatePartner,
    ) {}

    async create(createPartner: IPartner): Promise<IPartner> {
        createPartner.id = createPartner.id || uuid();
        const erros = await this.validate.validateForCreate(createPartner);
        if (erros.length === 0) {
            return this.repository.save(createPartner);
        }
        throw new NegocioError(erros);
    }
}
