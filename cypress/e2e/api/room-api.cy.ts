import { generateRoom } from '../../support/helpers/data.factory';

describe('Room API', { tags: ['@regression'] }, () => {
  it('GET /api/room/ - should list all rooms', () => {
    cy.request('GET', '/api/room').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.rooms).to.be.an('array');
      expect(response.body.rooms.length).to.be.greaterThan(0);
    });
  });

  it('POST /api/room/ - should create a room (requires auth)', () => {
    const room = generateRoom();
    cy.createRoomViaApi(room).then((res) => {
      expect(res.roomid).to.be.greaterThan(0);

      // Verify the room exists via GET
      cy.request(`/api/room/${res.roomid}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.roomName).to.eq(room.roomName);
        expect(response.body.type).to.eq(room.type);
        expect(response.body.roomPrice).to.eq(room.roomPrice);
      });

      cy.deleteRoomViaApi(res.roomid);
    });
  });

  it('GET /api/room/{id} - should get a single room', () => {
    const room = generateRoom();
    cy.createRoomViaApi(room).then((res) => {
      cy.request(`/api/room/${res.roomid}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.roomid).to.eq(res.roomid);
        expect(response.body.roomName).to.eq(room.roomName);
      });

      cy.deleteRoomViaApi(res.roomid);
    });
  });

  it('PUT /api/room/{id} - should update a room (requires auth)', () => {
    const room = generateRoom();
    cy.createRoomViaApi(room).then((res) => {
      cy.adminLogin();
      cy.request({
        method: 'PUT',
        url: `/api/room/${res.roomid}`,
        body: { ...room, roomName: '999', description: 'Updated description' },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });

      cy.deleteRoomViaApi(res.roomid);
    });
  });

  it('DELETE /api/room/{id} - should delete a room (requires auth)', () => {
    const room = generateRoom();
    cy.createRoomViaApi(room).then((res) => {
      cy.adminLogin();
      cy.request({
        method: 'DELETE',
        url: `/api/room/${res.roomid}`,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('POST /api/room/ - should validate room price range (1-999)', () => {
    cy.adminLogin();
    cy.request({
      method: 'POST',
      url: '/api/room',
      body: generateRoom({ roomPrice: 0 }),
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 409]);
    });
  });

  it('POST /api/room/ - should reject room price above 999', () => {
    cy.adminLogin();
    cy.request({
      method: 'POST',
      url: '/api/room',
      body: generateRoom({ roomPrice: 1000 }),
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 409]);
    });
  });
});
