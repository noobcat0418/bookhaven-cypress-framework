class HomePage {
  readonly selectors = {
    logo: '.hotel-logoUrl img',
    nav: {
      rooms: 'a[href="#rooms"]',
      contact: 'a[href="#contact"]',
      adminLink: 'a[href="/admin"]',
    },
    rooms: {
      cards: '.hotel-room-info',
      bookButton: '.openBooking',
      roomType: '.type',
      roomDescription: '.room-description',
      roomImage: '.hotel-img',
      features: '.room-features',
      price: '.room-price',
    },
    availability: {
      checkin: 'input[placeholder="Check-in"]',
      checkout: 'input[placeholder="Check-out"]',
      checkButton: 'button.btn-outline-primary',
    },
    map: '.map',
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
    cy.get(this.selectors.nav.adminLink).click();
  }
}

export const homePage = new HomePage();
