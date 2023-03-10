import { useCallback, useEffect, useState } from "react";

import { useDataContext } from "../context/DataContext";
import { DailyPuzzleScores } from "../types/types";
import { generateScore } from "../utils/generateScore";
import { getTime } from "../utils/getTime";
import FoundWords from "./FoundWords";

const DailyPuzzle = () => {
  const [input, setInput] = useState("");
  const [copiedResults, setCopiedResults] = useState(false);
  const {
    dailyFoundWords,
    dailyThreeGram,
    dailyScore,
    dailyWordCount,
    fetched,
    isTimeUp,
    secondsLeft,
    startedTimer,
    today,
    words,
    addDailyFoundWord,
    clearDailyFoundWords,
    setDailyScoreAndWordCount,
    setIsTimeUp,
    setSecondsLeft,
    setShowMaxScore,
    setStartedTimer,
  } = useDataContext();

  const solutions: string[] = words.filter((word) =>
    word.includes(dailyThreeGram.toLowerCase())
  );

  const storeHighScore = useCallback(() => {
    let dailyPuzzleScores: DailyPuzzleScores = JSON.parse(
      window.localStorage.getItem("dailyPuzzleScores") || "[]"
    );
    const todaysScore = {
      day: today,
      letters: dailyThreeGram,
      score: dailyScore,
      wordCount: dailyWordCount,
    };
    if (dailyPuzzleScores.length === 0) {
      dailyPuzzleScores = [todaysScore];
      window.localStorage.setItem(
        "dailyPuzzleScores",
        JSON.stringify(dailyPuzzleScores)
      );
    } else if (
      dailyPuzzleScores[0].day === today &&
      dailyPuzzleScores[0].score < dailyScore
    ) {
      dailyPuzzleScores = [
        todaysScore,
        ...dailyPuzzleScores.slice(1, dailyPuzzleScores.length),
      ];
      window.localStorage.setItem(
        "dailyPuzzleScores",
        JSON.stringify(dailyPuzzleScores)
      );
    } else if (dailyPuzzleScores[0].day !== today) {
      dailyPuzzleScores = [todaysScore, ...dailyPuzzleScores];
      window.localStorage.setItem(
        "dailyPuzzleScores",
        JSON.stringify(dailyPuzzleScores)
      );
    }
  }, [dailyScore, dailyThreeGram, dailyWordCount, today]);

  const startTimer = useCallback(
    () =>
      setTimeout(() => {
        if (secondsLeft === 0) {
          setIsTimeUp(true);
          storeHighScore();
        } else {
          setSecondsLeft(secondsLeft - 1);
        }
      }, 1000),
    [secondsLeft, setIsTimeUp, setSecondsLeft, storeHighScore]
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
          <b>Word count:</b>
        </p>
        <p className="word-count">{dailyWordCount}</p>
        <p className="right-space">
          <b>Score:</b>
        </p>
        <p>{dailyScore}</p>
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
          if (!startedTimer) {
            setStartedTimer(true);
          }
        }}
        type="text"
        value={input}
        disabled={isTimeUp}
      />
      <span className="flex">
        {isTimeUp && (
          <button
            className="sm-button right-space"
            disabled={!isTimeUp}
            onClick={() => {
              clearDailyFoundWords();
              setIsTimeUp(false);
              setSecondsLeft(300);
              setCopiedResults(false);
              setStartedTimer(false);
              setShowMaxScore(false);
            }}
          >
            Play again
          </button>
        )}
        {isTimeUp && (
          <button
            className="sm-button"
            onClick={async () => {
              await navigator.clipboard.writeText(
                `https://yunashin.github.io/flexicography \n${today} \nLetters: ${dailyThreeGram} \nWord count: ${dailyWordCount} \nScore: ${dailyScore}`
              );
              setCopiedResults(true);
            }}
            disabled={copiedResults}
          >
            {copiedResults ? "Copied" : "Share results"}
          </button>
        )}
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
            setIsTimeUp(true);
            storeHighScore();
          }}
        >
          Give up?
        </button>
      </div>
      <FoundWords isDailyPuzzle={true} />
    </>
  );
};

export default DailyPuzzle;
