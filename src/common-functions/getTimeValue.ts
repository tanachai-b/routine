export function getTimeValue(time: string) {
  const hourString = time.match(/^.*?(?=:)/)?.[0] ?? "";
  const minuteString = time.match(/(?<=:).*$/)?.[0] ?? "";

  const hour = parseInt(hourString);
  const minute = parseInt(minuteString);

  return hour + minute / 60;
}
