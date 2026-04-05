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
      cy.get('.type').should('not.be.empty');
    });
  });

  it('should show room description', () => {
    cy.get('.room-description').first().should('not.be.empty');
  });

  it('should display room images', () => {
    cy.get('.hotel-img img').each(($img) => {
      cy.wrap($img).should('be.visible').and('have.attr', 'src').and('not.be.empty');
    });
  });

  it('should show feature badges (WiFi, TV, etc)', () => {
    homePage.getRoomCards().first().within(() => {
      cy.get('.room-features').should('exist');
    });
  });

  it('should display a "Book now" button on each room card', () => {
    cy.get('.openBooking').should('have.length.greaterThan', 0);
  });

  it('should navigate to reservation page when clicking "Book now"', () => {
    homePage.clickBookOnRoom(0);
    cy.url().should('include', '/reservation/');
  });
});
