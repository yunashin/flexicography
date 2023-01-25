import { Reducer } from "react";

import { ADD_FOUND_WORD, SET_FETCHED, SET_SCORE, SET_THREE_GRAM, SET_WORDS, SET_WORD_COUNT } from "./ActionTypes";
import { DataState } from "./DataContext";

export type DataAction =
 | { type: 'ADD_FOUND_WORD'; word: string; score: number; }
 | { type: 'SET_FETCHED'; value: boolean; }
 | { type: 'SET_SCORE'; value: number; }
 | { type: 'SET_THREE_GRAM'; value: string; }
 | { type: 'SET_WORD_COUNT'; value: number; }
 | { type: 'SET_WORDS'; value: string[]; };

export const DataReducer: Reducer<DataState, DataAction> = (
  state: DataState, action: DataAction
): DataState => {
  switch (action.type) {
    case ADD_FOUND_WORD: {
      return {
        ...state,
        foundWords: [...state.foundWords, { word: action.word, score: action.score }],
      }
    }
    case SET_FETCHED: {
      return {
        ...state,
        fetched: action.value,
      }
    }
    case SET_SCORE: {
      return {
        ...state,
        score: action.value,
      }
    }
    case SET_THREE_GRAM: {
      return {
        ...state,
        threeGram: action.value,
      }
    }
    case SET_WORD_COUNT: {
      return {
        ...state,
        wordCount: action.value,
      }
    }
    case SET_WORDS: {
      return {
        ...state,
        words: action.value,
      }
    }
    default:
      return state;
  }
}