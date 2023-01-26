import { ReactElement, useCallback, useEffect, useReducer } from "react";

import { DataContext } from "./DataContext";
// @ts-expect-error not TS
import dictionary from '../../txt/dictionary.txt';
import { DataReducer } from "./DataReducer";
import { ADD_FOUND_WORD, CLEAR_FOUND_WORDS, SET_FETCHED, SET_SCORE, SET_SECONDS_LEFT, SET_THREE_GRAM, SET_WORDS, SET_WORD_COUNT } from "./ActionTypes";
import { getRandomInt } from "../utils/getRandomInt";

const initialState = {
  fetched: false,
  foundWords: [],
  score: 0,
  secondsLeft: 120,
  threeGram: '',
  wordCount: 0,
  words: [],
}

export const DataProvider = ({ children }: { children: ReactElement }): ReactElement => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const addFoundWord = useCallback((word: string, score: number) => {
    dispatch({ type: ADD_FOUND_WORD, word, score });
  }, []);

  const clearFoundWords = useCallback(() => {
    dispatch({ type: CLEAR_FOUND_WORDS });
  }, []);

  const setFetched = useCallback((fetched: boolean) => {
    dispatch({ type: SET_FETCHED, value: fetched });
  }, []);

  const setScore = useCallback((score: number) => {
    dispatch({ type: SET_SCORE, value: score });
  }, []);

  const setSecondsLeft = useCallback((secondsLeft: number) => {
    dispatch({ type: SET_SECONDS_LEFT, value: secondsLeft });
  }, []);

  const setThreeGram = useCallback((threeGram: string) => {
    dispatch({ type: SET_THREE_GRAM, value: threeGram });
  }, []);

  const setWordCount = useCallback((wordCount: number) => {
    dispatch({ type: SET_WORD_COUNT, value: wordCount });
  }, []);

  const setWords = useCallback((words: string[]) => {
    dispatch({ type: SET_WORDS, value: words });
  }, []);

  useEffect(() => {
    if (!state.fetched) {
      fetch(dictionary).then(raw => raw.text()).then(text => {
        const words = text.split(/\r?\n/);
        setWords(words);
      }).then(() => { 
        setFetched(true);
      });
    }
  }, [setFetched, setWords, state.fetched]);

  useEffect(() => {
    if (state.words.length && state.fetched) {
      const randomWord = state.words[getRandomInt(0, state.words.length)].toUpperCase();
      const index = getRandomInt(3, randomWord.length);
      setThreeGram(randomWord.slice(index - 3, index));
    }
  }, [setThreeGram, state.fetched, state.words]);

  const data = {
    fetched: state.fetched,
    foundWords: state.foundWords,
    score: state.score,
    secondsLeft: state.secondsLeft,
    threeGram: state.threeGram,
    wordCount: state.wordCount,
    words: state.words,
    addFoundWord,
    clearFoundWords,
    setFetched,
    setScore,
    setSecondsLeft,
    setThreeGram,
    setWordCount,
    setWords,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}