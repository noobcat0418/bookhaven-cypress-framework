export {};

const API_URL = Cypress.config('baseUrl');

Cypress.Commands.add('createBookingViaApi', (data: BookingPayload) => {
  return cy
    .request({
      method: 'POST',
      url: `${API_URL}/api/booking/`,
      body: data,
    })
    .then((response) => {
      expect(response.status).to.eq(201);
      return { bookingid: response.body.bookingid };
    });
});

Cypress.Commands.add('deleteBookingViaApi', (bookingId: number) => {
  cy.adminLogin();
  cy.request({
    method: 'DELETE',
    url: `${API_URL}/api/booking/${bookingId}`,
    failOnStatusCode: false,
  });
});
