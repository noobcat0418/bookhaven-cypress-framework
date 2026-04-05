import { reservationPage } from '../../support/pages/reservation.page';
import { generateRoom } from '../../support/helpers/data.factory';

describe('Booking Validation', { tags: ['@regression'] }, () => {
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

  beforeEach(() => {
    reservationPage.visit(roomId);
    reservationPage.selectDatesOnCalendar();
  });

  it('should show errors when all fields are empty', () => {
    reservationPage.submitReservation();
    reservationPage.verifyErrors();
  });

  it('should reject firstname shorter than 3 characters', () => {
    reservationPage.fillGuestDetails({
      firstname: 'AB',
      lastname: 'Anderson',
      email: 'test@bookhaven.test',
      phone: '12345678901',
    });
    reservationPage.submitReservation();
    reservationPage.verifyErrors();
  });

  it('should reject lastname shorter than 3 characters', () => {
    reservationPage.fillGuestDetails({
      firstname: 'James',
      lastname: 'AB',
      email: 'test@bookhaven.test',
      phone: '12345678901',
    });
    reservationPage.submitReservation();
    reservationPage.verifyErrors();
  });

  it('should reject invalid email format', () => {
    reservationPage.fillGuestDetails({
      firstname: 'James',
      lastname: 'Anderson',
      email: 'invalid-email',
      phone: '12345678901',
    });
    reservationPage.submitReservation();
    reservationPage.verifyErrors();
  });

  it('should reject phone number shorter than 11 characters', () => {
    reservationPage.fillGuestDetails({
      firstname: 'James',
      lastname: 'Anderson',
      email: 'test@bookhaven.test',
      phone: '1234567890',
    });
    reservationPage.submitReservation();
    reservationPage.verifyErrors();
  });

  it('should show error when no dates are selected', () => {
    // Visit fresh page without selecting dates
    reservationPage.visit(roomId);
    reservationPage.fillGuestDetails({
      firstname: 'James',
      lastname: 'Anderson',
      email: 'test@bookhaven.test',
      phone: '12345678901',
    });
    reservationPage.submitReservation();
    reservationPage.verifyErrors();
  });
});
