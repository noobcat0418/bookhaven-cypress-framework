import { adminReportPage } from '../../support/pages/admin-report.page';
import { generateRoom, generateBooking } from '../../support/helpers/data.factory';

describe('Report Calendar', { tags: ['@regression'] }, () => {
  let roomId: number;

  before(() => {
    const room = generateRoom();
    cy.createRoomViaApi(room).then((res) => {
      roomId = res.roomid;
      // Create a booking within the current month so it appears on the default calendar view
      const today = new Date();
      const checkin = new Date(today.getFullYear(), today.getMonth(), Math.min(today.getDate() + 1, 25));
      const checkout = new Date(checkin);
      checkout.setDate(checkout.getDate() + 2);
      const formatDate = (d: Date) => d.toISOString().split('T')[0];
      const booking = generateBooking({
        roomid: roomId,
        bookingdates: {
          checkin: formatDate(checkin),
          checkout: formatDate(checkout),
        },
      });
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
    cy.reload();
    cy.get(adminReportPage.selectors.calendar, { timeout: 15000 }).should('be.visible');
    adminReportPage.getCalendarEvents().should('have.length.greaterThan', 0);
  });

  it('should display calendar navigation controls', () => {
    cy.contains('button', 'Today').should('be.visible');
    cy.contains('button', 'Back').should('be.visible');
    cy.contains('button', 'Next').should('be.visible');
  });
});
