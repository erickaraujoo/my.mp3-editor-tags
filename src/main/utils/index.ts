export function getFullDate() {
  const date = new Date()
    .toString()
    .replace(/[A-Z]{3}\+/, '+')
    .split(/ /);

  return `${date[2]}-${date[1]}-${date[3]}:${date[4]} ${date[5]}`;
}

export const replaceSpecialChars = (str: string) => (str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') : null);
export const replacePontuations = (str: string) => (str ? str.replace(/[”.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') : null);
export const replaceBars = (str: string) =>
  str ? str.replace(/[\\"]/g, '').replace(/\//g, '').replace('  ', ' ').replace(':', '').split('*').join('') : null;

export const validateSpotifyToken = (lastTokenTimestamp: number) => {
  const currentTimestamp = new Date().getTime();

  const total = currentTimestamp - lastTokenTimestamp;

  return total / 1000 / 60 <= 60;
};

export const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));
