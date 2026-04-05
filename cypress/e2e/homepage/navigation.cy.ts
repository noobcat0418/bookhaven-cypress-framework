import { homePage } from '../../support/pages/home.page';

describe('Navigation', { tags: ['@regression'] }, () => {
  beforeEach(() => {
    homePage.visit();
  });

  it('should display the hotel logo', () => {
    cy.get('.hotel-logoUrl img').should('be.visible');
  });

  it('should have an admin link that navigates to /admin', () => {
    homePage.navigateToAdmin();
    cy.url().should('include', '/admin');
  });

  it('should display the map section', () => {
    cy.get('.map').should('exist');
  });

  it('should display the footer', () => {
    cy.get('footer').should('exist');
  });

  it('should display the contact section', () => {
    cy.get('[data-testid="ContactName"]').scrollIntoView().should('be.visible');
  });

  context('responsive - mobile viewport', () => {
    beforeEach(() => {
      cy.viewport(375, 667);
    });

    it('should render the page correctly on mobile', () => {
      cy.get('.hotel-room-info').should('have.length.greaterThan', 0);
    });
  });

  context('responsive - tablet viewport', () => {
    beforeEach(() => {
      cy.viewport(768, 1024);
    });

    it('should render the page correctly on tablet', () => {
      cy.get('.hotel-room-info').should('have.length.greaterThan', 0);
    });
  });
});
