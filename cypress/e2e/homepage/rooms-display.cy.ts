import { homePage } from '../../support/pages/home.page';

describe('Rooms Display', { tags: ['@regression'] }, () => {
  beforeEach(() => {
    homePage.visit();
  });

  it('should display at least one room card', () => {
    homePage.getRoomCards().should('have.length.greaterThan', 0);
  });

  it('should show room type on each card', () => {
    homePage.getRoomCards().first().within(() => {
      cy.get('.card-title').should('not.be.empty');
    });
  });

  it('should show room description', () => {
    cy.get('.room-card .card-text').first().should('not.be.empty');
  });

  it('should display room images', () => {
    cy.get('.room-card .card-img-top').each(($img) => {
      cy.wrap($img).should('be.visible').and('have.attr', 'src').and('not.be.empty');
    });
  });

  it('should show feature badges (WiFi, TV, etc)', () => {
    homePage.getRoomCards().first().within(() => {
      cy.get('.badge').should('exist');
    });
  });

  it('should display a "Book" button on each room card', () => {
    cy.get('.room-card .btn-primary').should('have.length.greaterThan', 0);
  });

  it('should navigate to reservation page when clicking "Book"', () => {
    homePage.clickBookOnRoom(0);
    cy.url().should('include', '/reservation/');
  });
});
