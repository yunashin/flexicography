import { useCallback, useEffect, useState } from "react";
import { format, startOfToday } from "date-fns";

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
    words,
    addDailyFoundWord,
    clearDailyFoundWords,
    setDailyScoreAndWordCount,
    setIsTimeUp,
    setSecondsLeft,
    setStartedTimer,
  } = useDataContext();

  const solutions: string[] = words.filter((word) =>
    word.includes(dailyThreeGram.toLowerCase())
  );

  const today = format(startOfToday(), "MMM d, yyyy");

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
      dailyPuzzleScores[0].letters === dailyThreeGram &&
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
    } else if (dailyPuzzleScores[0].letters !== dailyThreeGram) {
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
        {isTimeUp && (
          <button
            className="sm-button right-space"
            disabled={!isTimeUp}
            onClick={() => {
              clearDailyFoundWords();
              setIsTimeUp(false);
              setSecondsLeft(300);
              setCopiedResults(false);
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
