const uuid = require('uuidv4');

describe('Create a partner', () => {
    it('should be able to add all predefined pdvs', () => {
        cy.fixture('pdvs').as('pdvs');
        cy.get('@pdvs').each(pdv => {
            cy.request('POST', 'http://localhost:3000/partners', pdv).as(
                'request',
            );
            cy.get('@request')
                .its('headers')
                .its('content-type')
                .should('include', 'application/json');
            cy.get('@request').its('headers').its('location').should('exist');
            cy.get('@request').its('body').should('have.property', 'id');
        });
    });

    it('should get error on unique document', () => {
        const body = {
            tradingName: 'Adega Rua 1',
            ownerName: 'Lontra',
            document: uuid.uuid(),
            coverageArea: {
                type: 'MultiPolygon',
                coordinates: [
                    [
                        [
                            [-48.04212927818298, -15.769746275491135],
                            [-48.03838491439819, -15.772017767211413],
                            [-48.03451180458069, -15.769240348872202],
                            [-48.0392861366272, -15.76706175248885],
                            [-48.04212927818298, -15.769746275491135],
                        ],
                    ],
                ],
            },
            address: {
                type: 'Point',
                coordinates: [-48.040112257003784, -15.769477824789218],
            },
        };
        cy.request('POST', 'http://localhost:3000/partners', body).as(
            'request',
        );
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/partners',
            failOnStatusCode: false,
            body,
        }).as('duplicateRequest');

        cy.get('@duplicateRequest').its('status').should('eq', 400);
        cy.get('@duplicateRequest').its('body').should('exist');
        cy.get('@duplicateRequest')
            .its('body')
            .its('msgs')
            .should('have.length', 1);
        cy.get('@duplicateRequest')
            .its('body')
            .its('msgs')
            .should('contain', 'This document already registered');
    });
});
