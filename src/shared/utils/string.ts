export const removeSpecialCharacters = (inputString: string) => {
  const resultString = inputString.replace(/"/g, "").trim();
  return resultString;
};
