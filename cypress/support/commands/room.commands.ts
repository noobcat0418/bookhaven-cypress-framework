export {};

const API_URL = Cypress.config('baseUrl');

Cypress.Commands.add('createRoomViaApi', (data: RoomPayload) => {
  cy.adminLogin();
  return cy
    .request({
      method: 'POST',
      url: `${API_URL}/api/room/`,
      body: data,
    })
    .then((response) => {
      expect(response.status).to.eq(201);
      return { roomid: response.body.roomid };
    });
});

Cypress.Commands.add('deleteRoomViaApi', (roomId: number) => {
  cy.adminLogin();
  cy.request({
    method: 'DELETE',
    url: `${API_URL}/api/room/${roomId}`,
    failOnStatusCode: false,
  });
});
