import { createContext, useContext } from "react";

export interface DataState {
  dailyThreeGram: string;
  dailyScore: number;
  dailyWordCount: number;
  fetched: boolean;
  foundWords: { word: string; score: number }[];
  isTimeUp: boolean;
  secondsLeft: number;
  score: number;
  startedTimer: boolean;
  threeGram: string;
  wordCount: number;
  words: string[];
}

export interface DataContent extends DataState {
  addFoundWord: (word: string, score: number) => void;
  clearFoundWords: () => void;
  setDailyThreeGram: (threeGram: string) => void;
  setDailyScoreAndWordCount: (score: number, wordCount: number) => void;
  setFetched: (fetched: boolean) => void;
  setIsTimeUp: () => void;
  setSecondsLeft: (secondsLeft: number) => void;
  setScore: (score: number) => void;
  setStartedTimer: () => void;
  setThreeGram: (threeGram: string) => void;
  setWordCount: (wordCount: number) => void;
  setWords: (words: string[]) => void;
}

export const DataContext = createContext<DataContent>({
  dailyThreeGram: "",
  dailyScore: 0,
  dailyWordCount: 0,
  fetched: false,
  foundWords: [],
  isTimeUp: false,
  score: 0,
  secondsLeft: 300,
  startedTimer: false,
  threeGram: "",
  wordCount: 0,
  words: [],
  addFoundWord: () => {},
  clearFoundWords: () => {},
  setDailyThreeGram: () => {},
  setDailyScoreAndWordCount: () => {},
  setFetched: () => {},
  setIsTimeUp: () => {},
  setScore: () => {},
  setSecondsLeft: () => {},
  setStartedTimer: () => {},
  setThreeGram: () => {},
  setWordCount: () => {},
  setWords: () => {},
});

export const useDataContext = () => useContext(DataContext);
