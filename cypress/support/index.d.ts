/// <reference types="cypress" />

interface BookingDates {
  checkin: string;
  checkout: string;
}

interface BookingPayload {
  roomid: number;
  firstname: string;
  lastname: string;
  depositpaid: boolean;
  bookingdates: BookingDates;
  email: string;
  phone: string;
}

interface RoomPayload {
  roomName: string;
  type: 'Single' | 'Double' | 'Twin' | 'Family' | 'Suite';
  accessible: boolean;
  image: string;
  description: string;
  features: string[];
  roomPrice: number;
}

interface MessagePayload {
  name: string;
  email: string;
  phone: string;
  subject: string;
  description: string;
}

declare namespace Cypress {
  interface Chainable {
    /**
     * Log in as admin via API and set auth cookie
     */
    adminLogin(username?: string, password?: string): Chainable<void>;

    /**
     * Log out admin by clearing auth cookie
     */
    adminLogout(): Chainable<void>;

    /**
     * Get the current auth token cookie value
     */
    getAuthCookie(): Chainable<string>;

    /**
     * Create a booking via the API
     */
    createBookingViaApi(data: BookingPayload): Chainable<{ bookingid: number }>;

    /**
     * Delete a booking via the API (requires admin auth)
     */
    deleteBookingViaApi(bookingId: number): Chainable<void>;

    /**
     * Create a room via the API (requires admin auth)
     */
    createRoomViaApi(data: RoomPayload): Chainable<{ roomid: number }>;

    /**
     * Delete a room via the API (requires admin auth)
     */
    deleteRoomViaApi(roomId: number): Chainable<void>;

    /**
     * Create a message via the API
     */
    createMessageViaApi(data: MessagePayload): Chainable<{ messageid: number }>;

    /**
     * Delete a message via the API (requires admin auth)
     */
    deleteMessageViaApi(messageId: number): Chainable<void>;
  }
}
