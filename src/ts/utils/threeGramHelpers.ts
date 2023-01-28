import { FoundWord } from "../types/types";
import { getRandomInt } from "./getRandomInt";

export const getThreeOrMoreLetterWords = (words: string[]) => {
  return words.filter((word) => word.length >= 3);
};

export const sortFoundWordsByScore = (words: FoundWord[]) => {
  return words.sort((wordA, wordB) => {
    if (wordA.score === wordB.score) {
      if (wordA.word < wordB.word) return -1;
      if (wordA.word > wordB.word) return 1;
      return 0;
    }
    return wordB.score - wordA.score;
  });
};

export const getThreeGram = (words: string[]) => {
  const threeOrMoreLetterWords = getThreeOrMoreLetterWords(words);
  const randomWord =
    threeOrMoreLetterWords[
      getRandomInt(0, threeOrMoreLetterWords.length)
    ].toUpperCase();
  const index = getRandomInt(3, randomWord.length);
  return randomWord.slice(index - 3, index);
};
