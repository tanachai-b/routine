export function getTime() {
  const utcTime = (Date.now() % (1000 * 60 * 60 * 24)) / 1000 / 60 / 60;
  const timeZone = -new Date().getTimezoneOffset() / 60;

  const hours = (utcTime + timeZone + 24) % 24;
  // const minutes = (hours % 1) * 60;

  // const hourPart = Math.floor(hours);
  // const minutePart = Math.floor(minutes);

  return hours;
}
