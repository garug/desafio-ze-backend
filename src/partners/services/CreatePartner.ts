import { container, injectable, inject } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import ValidatePartner from './ValidatePartner';
import NegocioError from '../../errors/NegocioError';
import IPartner from '../entities/IPartner';
import IPartnerRepository from '../repositories/IPartnerRepository';

const validate = container.resolve(ValidatePartner);

@injectable()
export default class CreatePartner {
    constructor(
        @inject('PartnerRepository') private repository: IPartnerRepository,
    ) {}

    async execute(createPartner: IPartner): Promise<IPartner> {
        createPartner.id = createPartner.id || uuid();
        const erros = await validate.validateForCreate(createPartner);
        if (erros.length === 0) {
            return this.repository.save(createPartner);
        }
        throw new NegocioError(erros);
    }
}
