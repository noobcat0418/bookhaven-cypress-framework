class AdminRoomDetailPage {
  readonly selectors = {
    roomName: '#roomName',
    roomType: '#type',
    accessible: '#accessible',
    roomPrice: '#roomPrice',
    roomDescription: '#description',
    roomImage: '#image',
    features: {
      wifi: '#wifiCheckbox',
      tv: '#tvCheckbox',
      radio: '#radioCheckbox',
      refreshments: '#refreshCheckbox',
      safe: '#safeCheckbox',
      views: '#viewsCheckbox',
    },
    updateButton: '#update',
    bookings: {
      row: '.booking-row',
      editButton: '.bookingEdit',
      deleteButton: '.bookingDelete',
      confirmEdit: '.confirmBookingEdit',
      cancelEdit: '.exitBookingEdit',
      firstname: '.bookingFirstname',
      lastname: '.bookingLastname',
      checkin: '.bookingCheckin',
      checkout: '.bookingCheckout',
    },
    deleteRoom: '.roomDelete',
  };

  visit(roomId: number) {
    cy.visit(`/admin/room/${roomId}`);
  }

  editBooking(index: number) {
    cy.get(this.selectors.bookings.editButton).eq(index).click();
  }

  confirmBookingEdit() {
    cy.get(this.selectors.bookings.confirmEdit).click();
  }

  cancelBookingEdit() {
    cy.get(this.selectors.bookings.cancelEdit).click();
  }

  deleteBooking(index: number) {
    cy.get(this.selectors.bookings.deleteButton).eq(index).click();
  }

  deleteRoomAction() {
    cy.get(this.selectors.deleteRoom).click();
  }
}

export const adminRoomDetailPage = new AdminRoomDetailPage();
