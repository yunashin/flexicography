import { addDays, format, startOfToday } from "date-fns";

import { getThreeOrMoreLetterWords } from "./threeGramHelpers";

const firstDay = new Date(2023, 0); // Jan 1, 2023

const getIndex = (date: Date) => {
  let start = firstDay;
  let index = -1;
  do {
    index++;
    start = addDays(start, 1);
  } while (start <= date);

  return index;
};

export const useGetDailyThreeGram = (words: string[]) => {
  const threeOrMoreLetterWords = words.length
    ? getThreeOrMoreLetterWords(words)
    : [];

  const today = startOfToday();
  const formattedDate = format(today, "MMM d, yyyy");
  const index = getIndex(today);
  const dailyWord =
    threeOrMoreLetterWords[index % threeOrMoreLetterWords.length];
  let dailyWordIndex = dailyWord ? index % dailyWord.length : 0;
  if (dailyWord && dailyWordIndex + 3 > dailyWord.length) {
    dailyWordIndex = dailyWordIndex - 3;
  }
  const dailyThreeGram = dailyWord
    ? dailyWord.slice(dailyWordIndex, dailyWordIndex + 3).toUpperCase()
    : "";

  return { dailyThreeGram, today: formattedDate };
};
