export const wordsLimiter = (sentence: string, limit: number) => {
  let minifySentence = "";
  if (sentence.length > limit) {
    minifySentence = `${sentence.substring(0, limit)}...`;
  } else {
    minifySentence = sentence;
  }

  return minifySentence;
};
