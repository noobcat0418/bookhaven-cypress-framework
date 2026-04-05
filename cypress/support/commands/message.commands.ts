export {};

const API_URL = Cypress.config('baseUrl');

Cypress.Commands.add('createMessageViaApi', (data: MessagePayload) => {
  return cy
    .request({
      method: 'POST',
      url: `${API_URL}/api/message/`,
      body: data,
    })
    .then((response) => {
      expect(response.status).to.eq(201);
      return { messageid: response.body.messageid };
    });
});

Cypress.Commands.add('deleteMessageViaApi', (messageId: number) => {
  cy.adminLogin();
  cy.request({
    method: 'DELETE',
    url: `${API_URL}/api/message/${messageId}`,
    failOnStatusCode: false,
  });
});
