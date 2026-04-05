export {};

const API_URL = Cypress.config('baseUrl');

Cypress.Commands.add('createRoomViaApi', (data: RoomPayload) => {
  cy.adminLogin();
  return cy
    .request({
      method: 'POST',
      url: `${API_URL}/api/room`,
      body: data,
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      // Room POST returns {"success":true} without roomid, so fetch list to find it
      // Use the highest roomid match in case of name collisions from previous runs
      return cy.request('GET', `${API_URL}/api/room`).then((listResponse) => {
        const rooms = listResponse.body.rooms;
        const matches = rooms
          .filter((r: { roomName: string }) => r.roomName === data.roomName)
          .sort((a: { roomid: number }, b: { roomid: number }) => b.roomid - a.roomid);
        return { roomid: matches[0]?.roomid ?? 0 };
      });
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
