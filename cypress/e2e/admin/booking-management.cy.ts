import { adminRoomDetailPage } from '../../support/pages/admin-room-detail.page';
import { generateRoom, generateBooking } from '../../support/helpers/data.factory';

describe('Booking Management', { tags: ['@regression'] }, () => {
  let roomId: number;
  let bookingId: number;

  beforeEach(() => {
    // Create a room and booking for each test
    const room = generateRoom();
    cy.createRoomViaApi(room).then((roomRes) => {
      roomId = roomRes.roomid;
      const booking = generateBooking({ roomid: roomId });
      cy.createBookingViaApi(booking).then((bookingRes) => {
        bookingId = bookingRes.bookingid;
        cy.adminLogin();
        adminRoomDetailPage.visit(roomId);
      });
    });
  });

  afterEach(() => {
    if (bookingId) {
      cy.deleteBookingViaApi(bookingId);
    }
    if (roomId) {
      cy.deleteRoomViaApi(roomId);
    }
  });

  it('should display bookings on the room detail page', () => {
    // Verify bookings exist by checking for edit buttons
    cy.get(adminRoomDetailPage.selectors.bookings.editButton).should('have.length.greaterThan', 0);
  });

  it('should enter edit mode for a booking', () => {
    adminRoomDetailPage.editBooking(0);
    cy.get(adminRoomDetailPage.selectors.bookings.confirmEdit).should('be.visible');
    cy.get(adminRoomDetailPage.selectors.bookings.cancelEdit).should('be.visible');
  });

  it('should cancel booking edit', () => {
    adminRoomDetailPage.editBooking(0);
    adminRoomDetailPage.cancelBookingEdit();
    cy.get(adminRoomDetailPage.selectors.bookings.confirmEdit).should('not.exist');
  });

  it('should delete a booking', () => {
    adminRoomDetailPage.deleteBooking(0);
    // After deletion, the booking edit buttons should no longer exist
    cy.get(adminRoomDetailPage.selectors.bookings.editButton).should('not.exist');
    bookingId = 0; // Prevent afterEach cleanup
  });
});
