import { ReactElement, useCallback, useEffect, useReducer } from "react";

import { DataContext } from "./DataContext";
// @ts-expect-error not TS
import dictionary from "../../txt/dictionary.txt";
import { DataReducer } from "./DataReducer";
import {
  ADD_FOUND_WORD,
  CLEAR_FOUND_WORDS,
  SET_DAILY_SCORE_AND_WORD_COUNT,
  SET_DAILY_THREE_GRAM,
  SET_FETCHED,
  SET_IS_TIME_UP,
  SET_SCORE,
  SET_SECONDS_LEFT,
  SET_STARTED_TIMER,
  SET_THREE_GRAM,
  SET_WORDS,
  SET_WORD_COUNT,
} from "./ActionTypes";
import { getThreeGram } from "../utils/threeGramHelpers";
import { useGetDailyThreeGram } from "../utils/dailyThreeGramHelpers";

const initialState = {
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
};

export const DataProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const addFoundWord = useCallback((word: string, score: number) => {
    dispatch({ type: ADD_FOUND_WORD, word, score });
  }, []);

  const clearFoundWords = useCallback(() => {
    dispatch({ type: CLEAR_FOUND_WORDS });
  }, []);

  const setDailyThreeGram = useCallback((threeGram: string) => {
    dispatch({ type: SET_DAILY_THREE_GRAM, value: threeGram });
  }, []);

  const setDailyScoreAndWordCount = useCallback(
    (score: number, wordCount: number) => {
      dispatch({ type: SET_DAILY_SCORE_AND_WORD_COUNT, score, wordCount });
    },
    []
  );

  const setFetched = useCallback((fetched: boolean) => {
    dispatch({ type: SET_FETCHED, value: fetched });
  }, []);

  const setIsTimeUp = useCallback(() => {
    dispatch({ type: SET_IS_TIME_UP });
  }, []);

  const setScore = useCallback((score: number) => {
    dispatch({ type: SET_SCORE, value: score });
  }, []);

  const setSecondsLeft = useCallback((secondsLeft: number) => {
    dispatch({ type: SET_SECONDS_LEFT, value: secondsLeft });
  }, []);

  const setStartedTimer = useCallback(() => {
    dispatch({ type: SET_STARTED_TIMER });
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
      fetch(dictionary)
        .then((raw) => raw.text())
        .then((text) => {
          const words = text.split(/\r?\n/);
          setWords(words);
        })
        .then(() => {
          setFetched(true);
        });
    }
  }, [setFetched, setWords, state.fetched]);

  useEffect(() => {
    if (state.words.length && state.fetched) {
      const threeGram = getThreeGram(state.words);
      setThreeGram(threeGram);
    }
  }, [setThreeGram, state.fetched, state.words]);

  const dailyThreeGram = useGetDailyThreeGram(state.words);
  useEffect(() => {
    if (state.dailyThreeGram === "" && state.fetched) {
      setDailyThreeGram(dailyThreeGram);
    }
  }, [dailyThreeGram, setDailyThreeGram, state.dailyThreeGram, state.fetched]);

  const data = {
    dailyThreeGram: state.dailyThreeGram,
    dailyScore: state.dailyScore,
    dailyWordCount: state.dailyWordCount,
    fetched: state.fetched,
    foundWords: state.foundWords,
    isTimeUp: state.isTimeUp,
    score: state.score,
    secondsLeft: state.secondsLeft,
    startedTimer: state.startedTimer,
    threeGram: state.threeGram,
    wordCount: state.wordCount,
    words: state.words,
    addFoundWord,
    clearFoundWords,
    setDailyThreeGram,
    setDailyScoreAndWordCount,
    setFetched,
    setIsTimeUp,
    setScore,
    setSecondsLeft,
    setStartedTimer,
    setThreeGram,
    setWordCount,
    setWords,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
