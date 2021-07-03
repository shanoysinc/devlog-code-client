export const calcReadingTime = (note: string) => {
  const decimalValue = note.split(" ").length / 200;

  if (decimalValue < 1) {
    return decimalValue * 0.6; // return for seconds
  }

  return Math.ceil(decimalValue); // return for minutes
};
