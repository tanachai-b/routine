export function getRandomColor() {
  return `#${getRandomHex()}${getRandomHex()}${getRandomHex()}`;
}

function getRandomHex() {
  return Math.floor(256 * Math.random())
    .toString(16)
    .padStart(2, "0");
}
