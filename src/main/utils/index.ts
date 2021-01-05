export function getFullDate() {
  const date = new Date()
    .toString()
    .replace(/[A-Z]{3}\+/, "+")
    .split(/ /);

  return `${date[2]}-${date[1]}-${date[3]}:${date[4]} ${date[5]}`;
}
