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
      cy.get('.card-title').should('exist');
    });
  });

  it('should navigate to reservation page when clicking Book on a room', () => {
    homePage.clickBookOnRoom(0);
    cy.url().should('include', '/reservation/');
  });

  it('should display room images', () => {
    cy.get('.room-card .card-img-top').should('have.length.greaterThan', 0);
    cy.get('.room-card .card-img-top').first().should('be.visible');
  });

  it('should show feature badges on room cards', () => {
    homePage.getRoomCards().first().within(() => {
      cy.get('.badge').should('exist');
    });
  });
});
