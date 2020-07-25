import { container, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import ValidatePartner from './ValidatePartner';
import NegocioError from '../../NegocioError';
import PartnerRepository from '../repositories/PartnerRepository';
import { IPartner } from '../repositories/PartnerSchema';

const validate = container.resolve(ValidatePartner);

@injectable()
export default class CreatePartner {
    constructor(private repository: PartnerRepository) {}

    async execute(createPartner: IPartner): Promise<IPartner> {
        createPartner.id = createPartner.id || uuid();
        const erros = await validate.validateForCreate(createPartner);
        if (erros.length === 0) {
            return this.repository.save(createPartner);
        }
        throw new NegocioError(erros);
    }
}
