import { useMemo } from "react";

import { useDataContext } from "../context/DataContext";
import { sortFoundWordsByScore } from "../utils/threeGramHelpers";

const FoundWords = ({
  isDailyPuzzle,
  isFreePlayTimeUp,
}: {
  isDailyPuzzle?: boolean;
  isFreePlayTimeUp?: boolean;
}) => {
  const { dailyFoundWords, foundWords, isTimeUp } = useDataContext();

  const words = useMemo(() => {
    if (isDailyPuzzle) {
      return isTimeUp
        ? sortFoundWordsByScore(dailyFoundWords)
        : dailyFoundWords;
    }
    return isFreePlayTimeUp ? sortFoundWordsByScore(foundWords) : foundWords;
  }, [dailyFoundWords, foundWords, isDailyPuzzle, isFreePlayTimeUp, isTimeUp]);

  return (
    <div className="top-space">
      {words.length > 0 && (
        <div>
          <b>Found words</b>
        </div>
      )}
      {words.map((foundWord) => (
        <p className="found-word" key={foundWord.word}>
          {`${foundWord.word} (+${foundWord.score})`}
        </p>
      ))}
    </div>
  );
};

export default FoundWords;
