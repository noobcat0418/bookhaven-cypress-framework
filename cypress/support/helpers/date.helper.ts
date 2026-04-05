export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getFutureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return formatDate(date);
}

export function getFutureDatePair(startDaysFromNow: number, nights: number): { checkin: string; checkout: string } {
  return {
    checkin: getFutureDate(startDaysFromNow),
    checkout: getFutureDate(startDaysFromNow + nights),
  };
}
