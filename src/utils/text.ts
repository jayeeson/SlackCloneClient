export const toAcronym = (str: string, maxLetters?: number) => {
  const useMaxLetters = maxLetters ?? 2;
  const acronym = str.match(/(^[^\s])|(?<=\s)[^\s]/g);
  return acronym?.toString().replace(/,/g, '').slice(0, useMaxLetters).toLocaleUpperCase();
};

export const capitalizeFirstLetter = (str: string) => {
  if (!str.length) {
    return str;
  } else if (str.length == 1) {
    return str.toLocaleUpperCase();
  }
  return str.slice(0, 1).toLocaleUpperCase() + str.slice(1, str.length);
};

export const toCamelCase = (str: string) => {
  if (!str.length) {
    return str;
  } else if (str.length == 1) {
    return str.toLocaleLowerCase();
  }
  return str.slice(0, 1).toLocaleLowerCase() + str.slice(1, str.length);
};
