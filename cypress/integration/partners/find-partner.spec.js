describe('Find partner', () => {
    it('should find partner by id', () => {
        cy.request('http://localhost:3000/partners/1').as('request');
        cy.get('@request')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
        cy.get('@request').its('body').should('have.property', 'document');
        cy.get('@request')
            .its('body')
            .its('document')
            .should('eq', '02.453.716/000170');
    });

    it('should return status code 204 for inexistent partner', () => {
        cy.request('http://localhost:3000/partners/-1').as('request');
        cy.get('@request');
        cy.get('@request').its('status').should('eq', 204);
    });

    it('should return nearest partner with coverage area valid for specific point', () => {
        cy.request(
            'http://localhost:3000/partners?lat=-43.9438&long=-19.8655',
        ).as('request');
        cy.get('@request')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json');
        cy.get('@request').its('body').should('have.length', 1);
        cy.get('@request')
            .its('body')
            .its(0)
            .its('document')
            .should('eq', '06.269.410/0001-19');
    });
});
