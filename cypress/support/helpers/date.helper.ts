export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getFutureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return formatDate(date);
}

export function getFutureDatePair(startDaysFromNow: number, nights: number): { checkin: string; checkout: string } {
  // Use random offset to avoid date conflicts between bookings on the same room
  const randomOffset = Math.floor(Math.random() * 300);
  return {
    checkin: getFutureDate(startDaysFromNow + randomOffset),
    checkout: getFutureDate(startDaysFromNow + randomOffset + nights),
  };
}
