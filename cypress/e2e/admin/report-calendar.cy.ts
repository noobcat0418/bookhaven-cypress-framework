import { adminReportPage } from '../../support/pages/admin-report.page';
import { generateRoom, generateBooking } from '../../support/helpers/data.factory';

describe('Report Calendar', { tags: ['@regression'] }, () => {
  let roomId: number;

  before(() => {
    const room = generateRoom();
    cy.createRoomViaApi(room).then((res) => {
      roomId = res.roomid;
      // Create a booking so it shows on the calendar
      const booking = generateBooking({ roomid: roomId });
      cy.createBookingViaApi(booking);
    });
  });

  after(() => {
    if (roomId) {
      cy.deleteRoomViaApi(roomId);
    }
  });

  beforeEach(() => {
    cy.adminLogin();
    adminReportPage.visit();
  });

  it('should display the calendar', () => {
    cy.get(adminReportPage.selectors.calendar).should('be.visible');
  });

  it('should display booking events on the calendar', () => {
    adminReportPage.getCalendarEvents().should('have.length.greaterThan', 0);
  });

  it('should display calendar navigation controls', () => {
    cy.contains('button', 'Today').should('be.visible');
    cy.contains('button', 'Back').should('be.visible');
    cy.contains('button', 'Next').should('be.visible');
  });
});
