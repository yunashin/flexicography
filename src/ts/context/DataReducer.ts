import { Reducer } from "react";

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
import { DataState } from "./DataContext";

export type DataAction =
  | { type: "ADD_FOUND_WORD"; word: string; score: number }
  | { type: "CLEAR_FOUND_WORDS" }
  | { type: "SET_DAILY_THREE_GRAM"; value: string }
  | { type: "SET_DAILY_SCORE_AND_WORD_COUNT"; score: number; wordCount: number }
  | { type: "SET_FETCHED"; value: boolean }
  | { type: "SET_IS_TIME_UP" }
  | { type: "SET_SCORE"; value: number }
  | { type: "SET_SECONDS_LEFT"; value: number }
  | { type: "SET_STARTED_TIMER" }
  | { type: "SET_THREE_GRAM"; value: string }
  | { type: "SET_WORD_COUNT"; value: number }
  | { type: "SET_WORDS"; value: string[] };

export const DataReducer: Reducer<DataState, DataAction> = (
  state: DataState,
  action: DataAction
): DataState => {
  switch (action.type) {
    case ADD_FOUND_WORD: {
      return {
        ...state,
        foundWords: [
          { word: action.word, score: action.score },
          ...state.foundWords,
        ],
      };
    }
    case CLEAR_FOUND_WORDS: {
      return {
        ...state,
        foundWords: [],
      };
    }
    case SET_DAILY_THREE_GRAM: {
      return {
        ...state,
        dailyThreeGram: action.value,
      };
    }
    case SET_DAILY_SCORE_AND_WORD_COUNT: {
      return {
        ...state,
        dailyScore: action.score,
        dailyWordCount: action.wordCount,
      };
    }
    case SET_FETCHED: {
      return {
        ...state,
        fetched: action.value,
      };
    }
    case SET_IS_TIME_UP: {
      return {
        ...state,
        isTimeUp: true,
      };
    }
    case SET_SCORE: {
      return {
        ...state,
        score: action.value,
      };
    }
    case SET_SECONDS_LEFT: {
      return {
        ...state,
        secondsLeft: action.value,
      };
    }
    case SET_STARTED_TIMER: {
      return {
        ...state,
        startedTimer: true,
      };
    }
    case SET_THREE_GRAM: {
      return {
        ...state,
        threeGram: action.value,
      };
    }
    case SET_WORD_COUNT: {
      return {
        ...state,
        wordCount: action.value,
      };
    }
    case SET_WORDS: {
      return {
        ...state,
        words: action.value,
      };
    }
    default:
      return state;
  }
};