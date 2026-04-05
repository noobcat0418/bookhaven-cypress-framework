import { generateBooking, generateRoom } from '../../support/helpers/data.factory';

describe('Booking API', { tags: ['@regression'] }, () => {
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

  it('POST /api/booking/ - should create a booking', () => {
    const booking = generateBooking({ roomid: roomId });
    cy.request({
      method: 'POST',
      url: '/api/booking/',
      body: booking,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.bookingid).to.exist;
      expect(response.body.booking.firstname).to.eq(booking.firstname);
      expect(response.body.booking.lastname).to.eq(booking.lastname);

      // Clean up
      cy.adminLogin();
      cy.request({ method: 'DELETE', url: `/api/booking/${response.body.bookingid}`, failOnStatusCode: false });
    });
  });

  it('GET /api/booking/?roomid= - should list bookings for a room', () => {
    const booking = generateBooking({ roomid: roomId });
    cy.createBookingViaApi(booking).then((res) => {
      cy.request(`/api/booking/?roomid=${roomId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookings).to.be.an('array');
      });

      cy.deleteBookingViaApi(res.bookingid);
    });
  });

  it('GET /api/booking/{id} - should get a single booking', () => {
    const booking = generateBooking({ roomid: roomId });
    cy.createBookingViaApi(booking).then((res) => {
      cy.request(`/api/booking/${res.bookingid}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.bookingid).to.eq(res.bookingid);
      });

      cy.deleteBookingViaApi(res.bookingid);
    });
  });

  it('PUT /api/booking/{id} - should update a booking (requires auth)', () => {
    const booking = generateBooking({ roomid: roomId });
    cy.createBookingViaApi(booking).then((res) => {
      cy.adminLogin();
      cy.request({
        method: 'PUT',
        url: `/api/booking/${res.bookingid}`,
        body: { ...booking, firstname: 'Updated' },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.booking.firstname).to.eq('Updated');
      });

      cy.deleteBookingViaApi(res.bookingid);
    });
  });

  it('DELETE /api/booking/{id} - should delete a booking (requires auth)', () => {
    const booking = generateBooking({ roomid: roomId });
    cy.createBookingViaApi(booking).then((res) => {
      cy.adminLogin();
      cy.request({
        method: 'DELETE',
        url: `/api/booking/${res.bookingid}`,
      }).then((response) => {
        expect(response.status).to.eq(202);
      });
    });
  });

  it('GET /api/booking/summary?roomid= - should get booking summary', () => {
    cy.request(`/api/booking/summary?roomid=${roomId}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('POST /api/booking/ - should reject invalid booking data', () => {
    cy.request({
      method: 'POST',
      url: '/api/booking/',
      body: {
        roomid: roomId,
        firstname: 'AB',
        lastname: 'CD',
        depositpaid: true,
        bookingdates: { checkin: '2026-06-15', checkout: '2026-06-18' },
        email: 'invalid',
        phone: '123',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 409]);
    });
  });
});
