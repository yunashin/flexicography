import { useCallback, useEffect, useState } from "react";

import { useDataContext } from "../context/DataContext";
import { generateScore } from "../utils/generateScore";
import { getTime } from "../utils/getTime";
import FoundWords from "./FoundWords";
import SolutionWords from "./SolutionWords";

const FreeModeBody = () => {
  const [input, setInput] = useState("");
  const [showFoundWords, setShowFoundWords] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isTimedMode, setIsTimedMode] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [startedTimer, setStartedTimer] = useState(false);
  const {
    dailyThreeGram,
    fetched,
    foundWords,
    score,
    threeGram,
    wordCount,
    words,
    addFoundWord,
    clearFoundWords,
    setFetched,
    setScore,
    setWordCount,
  } = useDataContext();

  const solutions: string[] = words.filter((word) =>
    word.includes(threeGram.toLowerCase())
  );

  const startTimer = useCallback(
    () =>
      setTimeout(() => {
        if (secondsLeft === 0) {
          setIsTimeUp(true);
        } else {
          setSecondsLeft(secondsLeft - 1);
        }
      }, 1000),
    [secondsLeft, setSecondsLeft]
  );

  useEffect(() => {
    if (threeGram === dailyThreeGram) {
      setFetched(false);
    }
  }, [dailyThreeGram, setFetched, threeGram]);

  useEffect(() => {
    if (isTimedMode && startedTimer && !isTimeUp) {
      startTimer();
    }
  }, [isTimedMode, isTimeUp, startedTimer, startTimer]);

  return (
    <>
      <div className="three-gram">{fetched ? `${threeGram}` : "..."}</div>
      <span className="flex">
        <p className="right-space">
          <b>Word count:</b>
        </p>
        <p className="word-count">{wordCount}</p>
        <p className="right-space">
          <b>Score:</b>
        </p>
        <p>{score}</p>
      </span>
      <input
        autoFocus={true}
        onChange={({ target: { value } }) => {
          const foundWord = value.toLowerCase();
          if (
            solutions.includes(foundWord) &&
            !foundWords.some((wordAndScore) => wordAndScore.word === foundWord)
          ) {
            const { totalScore, wordScore } = generateScore(score, foundWord);
            setInput("");
            setWordCount(wordCount + 1);
            addFoundWord(foundWord, wordScore);
            setScore(totalScore);
          } else {
            setInput(value);
          }
          if (isTimedMode && !startedTimer) {
            setStartedTimer(true);
          }
        }}
        type="text"
        value={input}
        disabled={isTimeUp || !showFoundWords}
      />
      <span className="flex bottom-space">
        <button
          className="sm-button right-space"
          onClick={() => {
            setIsTimedMode(!isTimedMode);
            clearFoundWords();
            setScore(0);
            setWordCount(0);
            setIsTimeUp(false);
            setSecondsLeft(300);
            setShowFoundWords(true);
            setStartedTimer(false);
            setInput("");
          }}
        >
          {isTimedMode ? "Free mode" : "Timed mode"}
        </button>
        <button
          className="sm-button right-space"
          disabled={isTimedMode && !isTimeUp}
          onClick={() => setShowFoundWords(!showFoundWords)}
        >
          {showFoundWords ? "Show solutions" : "Show found words"}
        </button>
        <button
          className="sm-button"
          onClick={() => {
            setFetched(false);
            setIsTimedMode(false);
            clearFoundWords();
            setScore(0);
            setShowFoundWords(true);
            setWordCount(0);
            setIsTimeUp(false);
            setSecondsLeft(300);
            setStartedTimer(false);
            setInput("");
          }}
        >
          New game
        </button>
      </span>
      {isTimedMode && (
        <div className="bottom-space">
          <span className="flex">
            <p className="right-space timer">
              <b>Time left:</b> {getTime(secondsLeft)}
            </p>
          </span>
          <button
            className="button-link"
            disabled={isTimeUp}
            onClick={() => {
              setIsTimeUp(true);
            }}
          >
            Give up?
          </button>
        </div>
      )}
      {showFoundWords ? (
        <FoundWords isFreePlayTimeUp={isTimeUp} />
      ) : (
        <SolutionWords solutions={solutions} />
      )}
    </>
  );
};

export default FreeModeBody;
