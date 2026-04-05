import { generateRoom, generateBooking } from '../../support/helpers/data.factory';

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

  it('should reject booking with firstname shorter than 3 characters', () => {
    const booking = generateBooking({ roomid: roomId, firstname: 'AB' });
    cy.request({
      method: 'POST',
      url: '/api/booking',
      body: booking,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 409]);
    });
  });

  it('should reject booking with lastname shorter than 3 characters', () => {
    const booking = generateBooking({ roomid: roomId, lastname: 'AB' });
    cy.request({
      method: 'POST',
      url: '/api/booking',
      body: booking,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 409]);
    });
  });

  it('should reject booking with invalid email', () => {
    const booking = generateBooking({ roomid: roomId, email: 'invalid-email' });
    cy.request({
      method: 'POST',
      url: '/api/booking',
      body: booking,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 409]);
    });
  });

  it('should reject booking with phone shorter than 11 characters', () => {
    const booking = generateBooking({ roomid: roomId, phone: '1234567890' });
    cy.request({
      method: 'POST',
      url: '/api/booking',
      body: booking,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 409]);
    });
  });

  it('should reject booking with checkout before checkin', () => {
    const booking = generateBooking({
      roomid: roomId,
      bookingdates: { checkin: '2026-06-20', checkout: '2026-06-18' },
    });
    cy.request({
      method: 'POST',
      url: '/api/booking',
      body: booking,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 409]);
    });
  });

  it('should accept valid booking data', () => {
    const booking = generateBooking({ roomid: roomId });
    cy.request({
      method: 'POST',
      url: '/api/booking',
      body: booking,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.bookingid).to.exist;

      // Clean up
      cy.deleteBookingViaApi(response.body.bookingid);
    });
  });
});
