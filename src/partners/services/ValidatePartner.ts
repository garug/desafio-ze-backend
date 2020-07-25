import { injectable } from 'tsyringe';

import { validatePoint, validateMultipolygon } from '../../utils/Validate';
import { IPartner } from '../repositories/PartnerSchema';
import PartnerRepository from '../repositories/PartnerRepository';

@injectable()
export default class ValidatePartner {
    constructor(private repository: PartnerRepository) {}

    async hasUniqueDocument(partner: IPartner): Promise<boolean> {
        const { document } = partner;
        const partners = await this.repository.findByDocument(document);
        return partners.length === 0;
    }

    async hasUniqueId(partner: IPartner): Promise<boolean> {
        const exists = await this.repository.exists(partner);
        return !exists;
    }

    hasValidAdress(partner: IPartner): boolean {
        if (partner.address) {
            return validatePoint(partner.address).length === 0;
        }
        return false;
    }

    hasValidCoverageArea(partner: IPartner): boolean {
        if (partner.coverageArea) {
            return validateMultipolygon(partner.coverageArea).length === 0;
        }
        return false;
    }

    async validateForCreate(partner: IPartner): Promise<Array<string>> {
        const [hasUniqueDocument, hasUniqueId] = await Promise.all([
            this.hasUniqueDocument(partner),
            this.hasUniqueId(partner),
        ]);

        const errors = [];

        if (!hasUniqueDocument) {
            errors.push('This document already registered');
        }

        if (!hasUniqueId) {
            errors.push('This id already saved');
        }

        if (!this.hasValidAdress(partner)) {
            errors.push("'adress' is not a valid GeoJSON Point");
        }

        if (!this.hasValidCoverageArea(partner)) {
            errors.push("'coverageArea' is not a valid GeoJSON Multipolygon");
        }

        return errors;
    }
}
