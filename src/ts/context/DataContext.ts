import { createContext, useContext } from "react";

export interface DataState {
  fetched: boolean;
  foundWords: {word: string, score: number}[];
  score: number;
  threeGram: string;
  wordCount: number;
  words: string[];
}

export interface DataContent extends DataState {
  addFoundWord: (word: string, score: number) => void;
  setFetched: (fetched: boolean) => void;
  setScore: (score: number) => void;
  setThreeGram: (threeGram: string) => void;
  setWordCount: (wordCount: number) => void;
  setWords: (words: string[]) => void;
}

export const DataContext = createContext<DataContent>({
  fetched: false,
  foundWords: [],
  score: 0,
  threeGram: '',
  wordCount: 0,
  words: [],
  addFoundWord: () => {},
  setFetched: () => {},
  setScore: () => {},
  setThreeGram: () => {},
  setWordCount: () => {},
  setWords: () => {},
});

export const useDataContext = () => useContext(DataContext);
