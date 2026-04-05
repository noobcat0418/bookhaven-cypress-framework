import { adminRoomsPage } from '../../support/pages/admin-rooms.page';
import { generateRoom } from '../../support/helpers/data.factory';

describe('Room Management', { tags: ['@regression'] }, () => {
  beforeEach(() => {
    cy.adminLogin();
    adminRoomsPage.visit();
  });

  it('should display the room listing', () => {
    adminRoomsPage.getRoomListings().should('have.length.greaterThan', 0);
  });

  it('should create a new room with all details', () => {
    const room = generateRoom({ features: ['WiFi', 'TV', 'Safe'] });

    adminRoomsPage.createRoom({
      roomName: room.roomName,
      type: room.type,
      accessible: room.accessible,
      roomPrice: room.roomPrice,
      features: room.features,
    });

    // Verify the room appears in the listing
    cy.get(adminRoomsPage.selectors.roomListing).should('contain.text', room.roomName);

    // Clean up: delete the created room via API
    cy.request('GET', '/api/room').then((response) => {
      const createdRoom = response.body.rooms.find(
        (r: { roomName: string }) => r.roomName === room.roomName,
      );
      if (createdRoom) {
        cy.request({ method: 'DELETE', url: `/api/room/${createdRoom.roomid}`, failOnStatusCode: false });
      }
    });
  });

  it('should create a room with no features', () => {
    const room = generateRoom({ features: [] });

    adminRoomsPage.createRoom({
      roomName: room.roomName,
      type: 'Single',
      accessible: true,
      roomPrice: room.roomPrice,
    });

    cy.get(adminRoomsPage.selectors.roomListing).should('contain.text', room.roomName);

    // Clean up
    cy.request('GET', '/api/room').then((response) => {
      const createdRoom = response.body.rooms.find(
        (r: { roomName: string }) => r.roomName === room.roomName,
      );
      if (createdRoom) {
        cy.request({ method: 'DELETE', url: `/api/room/${createdRoom.roomid}`, failOnStatusCode: false });
      }
    });
  });

  it('should navigate to room detail page', () => {
    adminRoomsPage.getRoomListings().first().click();
    cy.url().should('match', /\/admin\/room\/\d+/);
  });

  it('should delete a room', () => {
    // Create a room to delete
    const room = generateRoom();
    cy.createRoomViaApi(room).then(() => {
      adminRoomsPage.visit();
      adminRoomsPage.getRoomListings().then(($listings) => {
        const initialCount = $listings.length;
        adminRoomsPage.deleteRoom(initialCount - 1);
        adminRoomsPage.getRoomListings().should('have.length', initialCount - 1);
      });
    });
  });
});
