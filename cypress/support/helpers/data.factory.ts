import { getFutureDatePair } from './date.helper';

let counter = Date.now();
function uniqueId(): number {
  return counter++;
}

export function generateBooking(overrides?: Partial<BookingPayload>): BookingPayload {
  const dates = getFutureDatePair(30, 2);
  return {
    roomid: 1,
    firstname: `Guest${uniqueId()}`.slice(0, 18),
    lastname: `Tester${uniqueId()}`.slice(0, 30),
    depositpaid: true,
    bookingdates: {
      checkin: dates.checkin,
      checkout: dates.checkout,
    },
    email: `guest${uniqueId()}@bookhaven.test`,
    phone: '12345678901',
    ...overrides,
  };
}

export function generateRoom(overrides?: Partial<RoomPayload>): RoomPayload {
  const id = uniqueId();
  return {
    roomName: `${100 + (id % 900)}`,
    type: 'Double',
    accessible: false,
    image: 'https://www.mwtestconsultancy.co.uk/img/room1.jpg',
    description: `A comfortable room created for testing purposes - ${id}`,
    features: ['WiFi', 'TV'],
    roomPrice: Math.floor(Math.random() * 200) + 50,
    ...overrides,
  };
}

export function generateMessage(overrides?: Partial<MessagePayload>): MessagePayload {
  const id = uniqueId();
  return {
    name: `TestUser ${id}`,
    email: `testuser${id}@bookhaven.test`,
    phone: '12345678901',
    subject: `Test inquiry about availability ${id}`,
    description: `This is a test message for automation testing. We want to check if the contact form works correctly. ID: ${id}`,
    ...overrides,
  };
}

export function generateBranding() {
  return {
    name: 'BookHaven B&B',
    logoUrl: 'https://www.mwtestconsultancy.co.uk/img/rbp-logo.png',
    description: 'Welcome to BookHaven, a charming boutique bed and breakfast nestled in the heart of the countryside.',
    latitude: '52.6351204',
    longitude: '-1.6981345',
    contactName: 'BookHaven Reception',
    contactPhone: '01onal281100',
    contactEmail: 'info@bookhaven.test',
    line1: '123 High Street',
    line2: 'Village Centre',
    postTown: 'Ashford',
    county: 'Kent',
    postCode: 'TN24 8XX',
  };
}
