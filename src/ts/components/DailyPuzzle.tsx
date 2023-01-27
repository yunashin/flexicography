import { useCallback, useEffect, useState } from "react";

import { useDataContext } from "../context/DataContext";
import { generateScore } from "../utils/generateScore";
import { getTime } from "../utils/getTime";
import FoundWords from "./FoundWords";
import SolutionWords from "./SolutionWords";

const DailyPuzzle = () => {
  const [input, setInput] = useState("");
  const [showFoundWords, setShowFoundWords] = useState(true);
  const {
    dailyFoundWords,
    dailyThreeGram,
    dailyScore,
    dailyWordCount,
    fetched,
    isTimeUp,
    secondsLeft,
    startedTimer,
    words,
    addDailyFoundWord,
    setDailyScoreAndWordCount,
    setIsTimeUp,
    setSecondsLeft,
    setStartedTimer,
  } = useDataContext();

  const solutions: string[] = words.filter((word) =>
    word.includes(dailyThreeGram.toLowerCase())
  );

  const startTimer = useCallback(
    () =>
      setTimeout(() => {
        if (secondsLeft === 0) {
          setIsTimeUp();
        } else {
          setSecondsLeft(secondsLeft - 1);
        }
      }, 1000),
    [secondsLeft, setIsTimeUp, setSecondsLeft]
  );

  useEffect(() => {
    if (startedTimer && !isTimeUp) {
      startTimer();
    }
  }, [isTimeUp, startedTimer, startTimer]);

  return (
    <>
      <div className="three-gram">{fetched ? `${dailyThreeGram}` : "..."}</div>
      <span className="flex">
        <p className="right-space">
          <b>Word Count:</b>
        </p>
        <p className="columbia word-count">{dailyWordCount}</p>
        <p className="right-space">
          <b>Score:</b>
        </p>
        <p className="columbia">{dailyScore}</p>
      </span>
      <input
        autoFocus={true}
        onChange={({ target: { value } }) => {
          const foundWord = value.toLowerCase();
          if (
            solutions.includes(foundWord) &&
            !dailyFoundWords.some(
              (wordAndScore) => wordAndScore.word === foundWord
            )
          ) {
            const { totalScore, wordScore } = generateScore(
              dailyScore,
              foundWord
            );
            setInput("");
            setDailyScoreAndWordCount(totalScore, dailyWordCount + 1);
            addDailyFoundWord(foundWord, wordScore);
          } else {
            setInput(value);
          }
        }}
        type="text"
        value={input}
        disabled={isTimeUp || !startedTimer}
      />
      <span className="flex">
        <button
          className="sm-button right-space"
          disabled={startedTimer}
          onClick={() => setStartedTimer()}
        >
          Start
        </button>
        <button
          className="sm-button"
          disabled={!isTimeUp}
          onClick={() => setShowFoundWords(!showFoundWords)}
        >
          {showFoundWords ? "Show all solutions" : "Show found words"}
        </button>
      </span>
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
            setIsTimeUp();
          }}
        >
          Give up?
        </button>
      </div>
      {showFoundWords ? (
        <FoundWords isDailyPuzzle={true} />
      ) : (
        <SolutionWords isDailyPuzzle={true} solutions={solutions} />
      )}
    </>
  );
};

export default DailyPuzzle;
