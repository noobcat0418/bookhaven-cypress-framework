class AdminReportPage {
  readonly selectors = {
    calendar: '.rbc-calendar',
    calendarCells: '.rbc-day-bg',
    bookingForm: {
      firstname: '#firstname',
      lastname: '#lastname',
      roomId: '#roomid',
      depositPaid: '#depositpaid',
      bookButton: '.btn-outline-primary',
    },
    events: '.rbc-event',
  };

  visit() {
    cy.visit('/admin/report');
  }

  getCalendarEvents() {
    return cy.get(this.selectors.events);
  }

  fillBookingForm(data: { firstname: string; lastname: string; roomId: string; depositPaid: string }) {
    cy.get(this.selectors.bookingForm.firstname).type(data.firstname);
    cy.get(this.selectors.bookingForm.lastname).type(data.lastname);
    cy.get(this.selectors.bookingForm.roomId).select(data.roomId);
    cy.get(this.selectors.bookingForm.depositPaid).select(data.depositPaid);
  }

  submitBooking() {
    cy.get(this.selectors.bookingForm.bookButton).click();
  }
}

export const adminReportPage = new AdminReportPage();
