export function getFullDate() {
  const date = new Date()
    .toString()
    .replace(/[A-Z]{3}\+/, '+')
    .split(/ /);

  return `${date[2]}-${date[1]}-${date[3]}:${date[4]} ${date[5]}`;
}

export const replaceSpecialChars = (str: string) => (str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : null);
export const replacePontuations = (str: string) => (str ? str.replace(/[”.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') : null);
