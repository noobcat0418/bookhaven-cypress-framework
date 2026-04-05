export {};

const API_URL = Cypress.config('baseUrl');

Cypress.Commands.add('createMessageViaApi', (data: MessagePayload) => {
  return cy
    .request({
      method: 'POST',
      url: `${API_URL}/api/message`,
      body: data,
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      // POST doesn't return the message ID, so fetch the list to find it
      return cy.request('GET', `${API_URL}/api/message`).then((listResponse) => {
        const messages = listResponse.body.messages;
        const created = messages.find(
          (m: { name: string; subject: string }) => m.name === data.name && m.subject === data.subject,
        );
        return { messageid: created?.id ?? 0 };
      });
    });
});

Cypress.Commands.add('deleteMessageViaApi', (messageId: number) => {
  if (!messageId) return;
  cy.adminLogin();
  cy.request({
    method: 'DELETE',
    url: `${API_URL}/api/message/${messageId}`,
    failOnStatusCode: false,
  });
});
