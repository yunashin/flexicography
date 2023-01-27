import { useCallback, useState } from "react";

import { useDataContext } from "../context/DataContext";
import DailyPuzzle from "./DailyPuzzle";
import FreePlayBody from "./FreePlayBody";

const Body = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [isDailyPuzzle, setIsDailyPuzzle] = useState(true);

  const { clearFoundWords } = useDataContext();

  const toggleDailyPuzzle = useCallback(() => {
    setIsDailyPuzzle(!isDailyPuzzle);
    clearFoundWords();
  }, [clearFoundWords, isDailyPuzzle]);

  return (
    <div className="app-body">
      <div className="bottom-space">
        <span className="flex">
          <button
            className="sm-button right-space"
            disabled={isDailyPuzzle}
            onClick={toggleDailyPuzzle}
          >
            Daily puzzle
          </button>
          <button
            className="sm-button"
            disabled={!isDailyPuzzle}
            onClick={toggleDailyPuzzle}
          >
            Free play
          </button>
        </span>
        <div>
          <button
            className="button-link"
            onClick={() => setShowInstructions(!showInstructions)}
            type="submit"
          >
            {`How to play ${showInstructions ? "-" : "+"}`}
          </button>
        </div>
        {showInstructions && (
          <>
            <div className="intro">
              Flex your lexicographical skills in this simple word game!
            </div>
            <div className="intro">
              Enter as many words as you can that contain the following letters
              in consecutive order.
            </div>
          </>
        )}
      </div>
      {isDailyPuzzle ? <DailyPuzzle /> : <FreePlayBody />}
    </div>
  );
};

export default Body;
