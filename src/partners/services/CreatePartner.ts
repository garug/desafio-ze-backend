import { injectable } from 'tsyringe';

import PartnerRepository from '../PartnerRepository';
import { IPartner } from '../PartnerModel';

@injectable()
export default class CreatePartner {
    constructor(private repository: PartnerRepository) {}

    execute(partner: IPartner): Promise<IPartner> {
        if (partner.id) {
            this.verifyExists(partner.id);
        }
        return this.repository.save(partner);
    }

    private verifyExists(id: string): void {
        if (this.repository.findById(id)) {
            throw new Error('This partner already saved');
        }
    }
}
