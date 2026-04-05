class ReservationPage {
  readonly selectors = {
    calendar: '.rbc-calendar',
    calendarCells: '.rbc-day-bg',
    firstname: '.room-firstname',
    lastname: '.room-lastname',
    email: '.room-email',
    phone: '.room-phone',
    reserveButton: '#doReservation',
    confirmation: '.confirmation-modal',
    errorMessages: '.alert-danger',
  };

  visit(roomId: number, checkin?: string, checkout?: string) {
    let url = `/reservation/${roomId}`;
    if (checkin && checkout) {
      url += `?checkin=${checkin}&checkout=${checkout}`;
    }
    cy.visit(url);
  }

  fillGuestDetails(data: { firstname: string; lastname: string; email: string; phone: string }) {
    cy.get(this.selectors.firstname).type(data.firstname);
    cy.get(this.selectors.lastname).type(data.lastname);
    cy.get(this.selectors.email).type(data.email);
    cy.get(this.selectors.phone).type(data.phone);
  }

  selectDatesOnCalendar() {
    cy.get(this.selectors.calendarCells).then(($cells) => {
      const startIndex = Math.min(7, $cells.length - 3);
      const endIndex = startIndex + 2;

      const startCell = $cells[startIndex];
      const endCell = $cells[endIndex];
      const startRect = startCell.getBoundingClientRect();
      const endRect = endCell.getBoundingClientRect();

      cy.get(this.selectors.calendar)
        .trigger('mousedown', {
          clientX: startRect.x + startRect.width / 2,
          clientY: startRect.y + startRect.height / 2,
          force: true,
        })
        .trigger('mousemove', {
          clientX: endRect.x + endRect.width / 2,
          clientY: endRect.y + endRect.height / 2,
          force: true,
        })
        .trigger('mouseup', {
          clientX: endRect.x + endRect.width / 2,
          clientY: endRect.y + endRect.height / 2,
          force: true,
        });
    });
  }

  submitReservation() {
    cy.get(this.selectors.reserveButton).click();
  }

  verifyConfirmation() {
    cy.get(this.selectors.confirmation).should('be.visible');
  }

  verifyErrors() {
    cy.get(this.selectors.errorMessages).should('be.visible');
  }
}

export const reservationPage = new ReservationPage();
