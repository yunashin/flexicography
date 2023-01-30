import { createContext, useContext } from "react";

export interface DataState {
  dailyThreeGram: string;
  dailyFoundWords: { word: string; score: number }[];
  dailyScore: number;
  dailyWordCount: number;
  fetched: boolean;
  foundWords: { word: string; score: number }[];
  isTimeUp: boolean;
  score: number;
  secondsLeft: number;
  showMaxScore: boolean;
  startedTimer: boolean;
  threeGram: string;
  today: string;
  wordCount: number;
  words: string[];
}

export interface DataContent extends DataState {
  addDailyFoundWord: (word: string, score: number) => void;
  addFoundWord: (word: string, score: number) => void;
  clearDailyFoundWords: () => void;
  clearFoundWords: () => void;
  setDailyThreeGram: (threeGram: string) => void;
  setDailyScoreAndWordCount: (score: number, wordCount: number) => void;
  setFetched: (fetched: boolean) => void;
  setIsTimeUp: (isTimeUp: boolean) => void;
  setSecondsLeft: (secondsLeft: number) => void;
  setScore: (score: number) => void;
  setShowMaxScore: (showMaxScore: boolean) => void;
  setStartedTimer: (startedTimer: boolean) => void;
  setThreeGram: (threeGram: string) => void;
  setToday: (today: string) => void;
  setWordCount: (wordCount: number) => void;
  setWords: (words: string[]) => void;
}

export const DataContext = createContext<DataContent>({
  dailyThreeGram: "",
  dailyFoundWords: [],
  dailyScore: 0,
  dailyWordCount: 0,
  fetched: false,
  foundWords: [],
  isTimeUp: false,
  score: 0,
  showMaxScore: false,
  secondsLeft: 300,
  startedTimer: false,
  threeGram: "",
  today: "",
  wordCount: 0,
  words: [],
  addDailyFoundWord: () => {},
  addFoundWord: () => {},
  clearDailyFoundWords: () => {},
  clearFoundWords: () => {},
  setDailyThreeGram: () => {},
  setDailyScoreAndWordCount: () => {},
  setFetched: () => {},
  setIsTimeUp: () => {},
  setScore: () => {},
  setSecondsLeft: () => {},
  setShowMaxScore: () => {},
  setStartedTimer: () => {},
  setThreeGram: () => {},
  setToday: () => {},
  setWordCount: () => {},
  setWords: () => {},
});

export const useDataContext = () => useContext(DataContext);
