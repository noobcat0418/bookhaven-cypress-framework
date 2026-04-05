class HomePage {
  readonly selectors = {
    logo: '.navbar-brand',
    nav: {
      rooms: 'a[href="#rooms"]',
      contact: 'a[href="#contact"]',
      adminLink: 'a[href="/admin"]',
    },
    rooms: {
      cards: '.room-card',
      bookButton: '.room-card .btn-primary',
      roomType: '.room-card .card-title',
      roomDescription: '.room-card .card-text',
      roomImage: '.room-card .card-img-top',
      features: '.room-card .badge',
      price: '.room-card .fw-bold.fs-5',
    },
    availability: {
      checkin: '.booking-card input:first',
      checkout: '.booking-card input:last',
      checkButton: '.booking-card .btn-primary',
    },
    map: '.pigeon-tiles-box',
    footer: 'footer',
  };

  visit() {
    cy.visit('/');
  }

  getRoomCards() {
    return cy.get(this.selectors.rooms.cards);
  }

  clickBookOnRoom(index: number) {
    cy.get(this.selectors.rooms.bookButton).eq(index).click();
  }

  checkAvailability(checkin: string, checkout: string) {
    cy.get(this.selectors.availability.checkin).type(checkin);
    cy.get(this.selectors.availability.checkout).type(checkout);
    cy.get(this.selectors.availability.checkButton).click();
  }

  navigateToAdmin() {
    cy.get(this.selectors.nav.adminLink).first().click();
  }
}

export const homePage = new HomePage();
