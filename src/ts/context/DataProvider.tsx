import { ReactElement, useCallback, useEffect, useReducer } from "react";

import { DataContext } from "./DataContext";
// @ts-expect-error not TS
import dictionary from "../../txt/dictionary.txt";
import { DataReducer } from "./DataReducer";
import {
  ADD_DAILY_FOUND_WORD,
  ADD_FOUND_WORD,
  CLEAR_DAILY_FOUND_WORDS,
  CLEAR_FOUND_WORDS,
  SET_DAILY_SCORE_AND_WORD_COUNT,
  SET_DAILY_THREE_GRAM,
  SET_FETCHED,
  SET_IS_TIME_UP,
  SET_SCORE,
  SET_SECONDS_LEFT,
  SET_SHOW_MAX_SCORE,
  SET_STARTED_TIMER,
  SET_THREE_GRAM,
  SET_TODAY,
  SET_WORDS,
  SET_WORD_COUNT,
} from "./ActionTypes";
import { getThreeGram } from "../utils/threeGramHelpers";
import { useGetDailyThreeGram } from "../utils/dailyThreeGramHelpers";

const initialState = {
  dailyFoundWords: [],
  dailyThreeGram: "",
  dailyScore: 0,
  dailyWordCount: 0,
  fetched: false,
  foundWords: [],
  isTimeUp: false,
  score: 0,
  secondsLeft: 300,
  showMaxScore: false,
  startedTimer: false,
  threeGram: "",
  today: "",
  wordCount: 0,
  words: [],
};

export const DataProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [state, dispatch] = useReducer(DataReducer, initialState);

  const addDailyFoundWord = useCallback((word: string, score: number) => {
    dispatch({ type: ADD_DAILY_FOUND_WORD, word, score });
  }, []);

  const addFoundWord = useCallback((word: string, score: number) => {
    dispatch({ type: ADD_FOUND_WORD, word, score });
  }, []);

  const clearDailyFoundWords = useCallback(() => {
    dispatch({ type: CLEAR_DAILY_FOUND_WORDS });
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

  const setIsTimeUp = useCallback((isTimeUp: boolean) => {
    dispatch({ type: SET_IS_TIME_UP, value: isTimeUp });
  }, []);

  const setScore = useCallback((score: number) => {
    dispatch({ type: SET_SCORE, value: score });
  }, []);

  const setSecondsLeft = useCallback((secondsLeft: number) => {
    dispatch({ type: SET_SECONDS_LEFT, value: secondsLeft });
  }, []);

  const setShowMaxScore = useCallback((showMaxScore: boolean) => {
    dispatch({ type: SET_SHOW_MAX_SCORE, value: showMaxScore });
  }, []);

  const setStartedTimer = useCallback((startedTimer: boolean) => {
    dispatch({ type: SET_STARTED_TIMER, value: startedTimer });
  }, []);

  const setThreeGram = useCallback((threeGram: string) => {
    dispatch({ type: SET_THREE_GRAM, value: threeGram });
  }, []);

  const setToday = useCallback((today: string) => {
    dispatch({ type: SET_TODAY, value: today });
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

  const { dailyThreeGram, today } = useGetDailyThreeGram(state.words);
  useEffect(() => {
    if (state.dailyThreeGram !== dailyThreeGram && state.fetched) {
      setDailyThreeGram(dailyThreeGram);
      setToday(today);
    }
  }, [
    dailyThreeGram,
    setDailyThreeGram,
    setToday,
    state.dailyThreeGram,
    state.fetched,
    today,
  ]);

  const data = {
    dailyFoundWords: state.dailyFoundWords,
    dailyThreeGram: state.dailyThreeGram,
    dailyScore: state.dailyScore,
    dailyWordCount: state.dailyWordCount,
    fetched: state.fetched,
    foundWords: state.foundWords,
    isTimeUp: state.isTimeUp,
    score: state.score,
    secondsLeft: state.secondsLeft,
    showMaxScore: state.showMaxScore,
    startedTimer: state.startedTimer,
    threeGram: state.threeGram,
    today: state.today,
    wordCount: state.wordCount,
    words: state.words,
    addDailyFoundWord,
    addFoundWord,
    clearDailyFoundWords,
    clearFoundWords,
    setDailyThreeGram,
    setDailyScoreAndWordCount,
    setFetched,
    setIsTimeUp,
    setScore,
    setSecondsLeft,
    setShowMaxScore,
    setStartedTimer,
    setThreeGram,
    setToday,
    setWordCount,
    setWords,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
