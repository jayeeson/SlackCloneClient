export const colorHexAdder = (main: string, additive: string) => {
  if (main.length !== 7 || additive.length !== 7) {
    return main;
  }
  const mainNumberStrings = main.split('#');
  const additiveNumberStrings = additive.split('#');

  if (mainNumberStrings.length < 2 || additiveNumberStrings.length < 2) {
    return main;
  }

  const mainNumber = parseInt(mainNumberStrings[1], 16);
  const additiveNumber = parseInt(additiveNumberStrings[1], 16);
  const newColor = `#${(mainNumber + additiveNumber).toString(16)}`;
  return newColor;
};
