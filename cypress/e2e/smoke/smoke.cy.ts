import { generateBooking } from '../../support/helpers/data.factory';

describe('Smoke Tests', { tags: ['@smoke'] }, () => {
  it('homepage loads and displays rooms', () => {
    cy.visit('/');
    cy.get('.hotel-room-info').should('have.length.greaterThan', 0);
  });

  it('contact form is accessible', () => {
    cy.visit('/');
    cy.get('[data-testid="ContactName"]').should('be.visible');
    cy.get('[data-testid="ContactEmail"]').should('be.visible');
    cy.get('[data-testid="ContactPhone"]').should('be.visible');
    cy.get('[data-testid="ContactSubject"]').should('be.visible');
    cy.get('[data-testid="ContactDescription"]').should('be.visible');
  });

  it('admin login page loads', () => {
    cy.visit('/admin');
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#doLogin').should('be.visible');
  });

  it('booking API responds successfully', () => {
    const booking = generateBooking();
    cy.request({
      method: 'POST',
      url: '/api/booking/',
      body: booking,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.bookingid).to.exist;

      // Clean up
      cy.adminLogin();
      cy.request({
        method: 'DELETE',
        url: `/api/booking/${response.body.bookingid}`,
        failOnStatusCode: false,
      });
    });
  });

  it('rooms API responds successfully', () => {
    cy.request('GET', '/api/room/').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.rooms).to.be.an('array');
    });
  });
});
