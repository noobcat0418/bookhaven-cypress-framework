class ReservationPage {
  readonly selectors = {
    roomTitle: 'h1.fw-bold',
    roomImage: '.hero-image',
    bookingCard: '.booking-card',
    amenityIcons: '.amenity-icon',
    breadcrumb: '.breadcrumb',
    roomDescription: '.mb-4 p',
  };

  visit(roomId: number) {
    cy.visit(`/reservation/${roomId}`);
  }

  verifyRoomDetailsLoaded() {
    cy.get(this.selectors.roomTitle).should('be.visible');
    cy.get(this.selectors.roomImage).should('be.visible');
    cy.get(this.selectors.bookingCard).should('exist');
  }

  verifyBreadcrumb() {
    cy.get(this.selectors.breadcrumb).should('be.visible');
  }
}

export const reservationPage = new ReservationPage();
