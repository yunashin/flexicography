import { useMemo } from "react";
import $ from "jquery";

import { useDataContext } from "../context/DataContext";
import { generateScore } from "../utils/generateScore";
import { sortFoundWordsByScore } from "../utils/threeGramHelpers";

const FoundWords = ({
  isDailyPuzzle,
  isFreePlayTimeUp,
}: {
  isDailyPuzzle?: boolean;
  isFreePlayTimeUp?: boolean;
}) => {
  const {
    dailyFoundWords,
    dailyThreeGram,
    foundWords,
    isTimeUp,
    words,
    showMaxScore,
    setShowMaxScore,
  } = useDataContext();

  let maximumScore = 0;
  const solutions = words
    .filter((word) => word.includes(dailyThreeGram.toLowerCase()))
    .map((solution) => {
      const { wordScore } = generateScore(0, solution);
      maximumScore += wordScore;
      return { word: solution, score: wordScore };
    });

  const wordsFound = useMemo(() => {
    if (isDailyPuzzle) {
      return isTimeUp
        ? sortFoundWordsByScore(dailyFoundWords)
        : dailyFoundWords;
    }
    return isFreePlayTimeUp ? sortFoundWordsByScore(foundWords) : foundWords;
  }, [dailyFoundWords, foundWords, isDailyPuzzle, isFreePlayTimeUp, isTimeUp]);

  return (
    <div className="top-space">
      {wordsFound.length > 0 && <hr className="found-words-line" />}
      {isDailyPuzzle && isTimeUp && (
        <>
          <div>
            <button
              className="button-link"
              onClick={() => {
                setShowMaxScore(!showMaxScore);
                if ($("#maximum-score").css("display") === "none") {
                  $("#maximum-score").slideDown();
                } else {
                  $("#maximum-score").slideUp();
                }
              }}
            >
              {showMaxScore ? "Hide maximum score" : "Show maximum score"}
            </button>
          </div>
          <div id="maximum-score">
            {`${maximumScore} points (${solutions.length} words)`}
          </div>
        </>
      )}
      {wordsFound.map((foundWord) => (
        <p className="found-word" key={foundWord.word}>
          {`${foundWord.word} (+${foundWord.score})`}
        </p>
      ))}
    </div>
  );
};

export default FoundWords;
