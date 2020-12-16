export default (str: string, maxLetters?: number) => {
  const useMaxLetters = maxLetters ?? 2;
  const acronym = str.match(/(^[^\s])|(?<=\s)[^\s]/g);
  return acronym?.toString().replace(/,/g, '').slice(0, useMaxLetters).toLocaleUpperCase();
};
