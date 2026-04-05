import { reservationPage } from '../../support/pages/reservation.page';
import { generateRoom, generateBooking } from '../../support/helpers/data.factory';

describe('Create Booking', { tags: ['@regression'] }, () => {
  let roomId: number;

  before(() => {
    const room = generateRoom();
    cy.createRoomViaApi(room).then((res) => {
      roomId = res.roomid;
    });
  });

  after(() => {
    if (roomId) {
      cy.deleteRoomViaApi(roomId);
    }
  });

  it('should navigate to reservation page for a room', () => {
    reservationPage.visit(roomId);
    reservationPage.verifyRoomDetailsLoaded();
  });

  it('should display room amenities on reservation page', () => {
    reservationPage.visit(roomId);
    cy.get(reservationPage.selectors.amenityIcons).should('have.length.greaterThan', 0);
  });

  it('should display breadcrumb navigation', () => {
    reservationPage.visit(roomId);
    reservationPage.verifyBreadcrumb();
  });

  it('should create a booking via API and verify it exists', () => {
    const booking = generateBooking({ roomid: roomId });
    cy.createBookingViaApi(booking).then((res) => {
      expect(res.bookingid).to.exist;

      // Verify booking exists via GET (requires auth)
      cy.adminLogin();
      cy.request(`/api/booking/${res.bookingid}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.firstname).to.eq(booking.firstname);
      });

      cy.deleteBookingViaApi(res.bookingid);
    });
  });
});
