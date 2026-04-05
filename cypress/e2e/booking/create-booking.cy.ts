import { reservationPage } from '../../support/pages/reservation.page';
import { generateRoom } from '../../support/helpers/data.factory';

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
    cy.get(reservationPage.selectors.calendar).should('be.visible');
    cy.get(reservationPage.selectors.firstname).should('be.visible');
  });

  it('should complete a full booking flow', () => {
    reservationPage.visit(roomId);

    reservationPage.selectDatesOnCalendar();

    reservationPage.fillGuestDetails({
      firstname: 'James',
      lastname: 'Anderson',
      email: 'james@bookhaven.test',
      phone: '12345678901',
    });

    reservationPage.submitReservation();
    reservationPage.verifyConfirmation();
  });

  it('should display correct room information on reservation page', () => {
    reservationPage.visit(roomId);
    cy.get('.room-header').should('exist');
  });
});
