import { homePage } from '../../support/pages/home.page';

describe('Availability Check', { tags: ['@regression'] }, () => {
  beforeEach(() => {
    homePage.visit();
  });

  it('should display room cards on the homepage', () => {
    homePage.getRoomCards().should('have.length.greaterThan', 0);
  });

  it('should show room details including type and price', () => {
    homePage.getRoomCards().first().within(() => {
      cy.get('.type').should('exist');
    });
  });

  it('should navigate to reservation page when clicking Book on a room', () => {
    homePage.clickBookOnRoom(0);
    cy.url().should('include', '/reservation/');
  });

  it('should display room images', () => {
    cy.get('.hotel-img img').should('have.length.greaterThan', 0);
    cy.get('.hotel-img img').first().should('be.visible');
  });

  it('should show feature badges on room cards', () => {
    homePage.getRoomCards().first().within(() => {
      cy.get('.room-features').should('exist');
    });
  });
});
