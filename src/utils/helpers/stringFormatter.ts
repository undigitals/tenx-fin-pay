export const getCardTypeFromApiResp = (str: string) =>
  str
    .replace(/[0-9]/g, '')
    .replace(/([A-Z])/g, ' $1')
    .trim();

export const getOnlyNumbersFromString = (str: string) => str.replace(/\D/g, '');

export const capitalizeWords = (str: string): string => {
  const words = str.split(' ');
  const capitalizedWords = words.map((word) => {
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return capitalizedWords.join(' ');
};

export const filterAlphaNumeric = (str: string) => str.replace(/[{}]/g, '');
export const implodeString = (str: (string | undefined)[], divider = ', '): string => str.filter((val) => val).join(divider);
export const getPositiveNumberFromString = (str: string) => (Number(str) < 0 ? '0' : str);
