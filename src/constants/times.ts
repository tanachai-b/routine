export const TIMELINE_TIMES = Array.from({ length: 24 }).map((_, i) => {
  const hours = `${i}`.padStart(2, "0");
  const time = `${hours}:00`;
  return time;
});
