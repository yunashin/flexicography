import { useState } from "react";

import { useDataContext } from "../context/DataContext";
import DailyPuzzle from "./DailyPuzzle";
import FreePlayBody from "./FreePlayBody";
import HowToPlay from "./HowToPlay";
import Scoreboard from "./Scoreboard";

const Body = () => {
  const [content, setContent] = useState("dailyPuzzle");
  const isDailyPuzzle = content === "dailyPuzzle";
  const isFreePlay = content === "freePlay";
  const isScoreboard = content === "scoreboard";

  const { clearFoundWords, setScore, setShowMaxScore, setWordCount } =
    useDataContext();

  return (
    <div className="app-body">
      <div className="bottom-margin">
        <span className="flex">
          <button
            className="lg-button right-space"
            disabled={isDailyPuzzle}
            onClick={() => {
              setContent("dailyPuzzle");
              setShowMaxScore(false);
            }}
          >
            Daily puzzle
          </button>
          <button
            className="lg-button right-space"
            disabled={isFreePlay}
            onClick={() => {
              setContent("freePlay");
              clearFoundWords();
              setWordCount(0);
              setScore(0);
            }}
          >
            Free play
          </button>
          <button
            className="lg-button"
            disabled={isScoreboard}
            onClick={() => {
              setContent("scoreboard");
            }}
          >
            Scoreboard
          </button>
        </span>
      </div>
      {!isScoreboard && <HowToPlay />}
      {isDailyPuzzle && <DailyPuzzle />}
      {isFreePlay && <FreePlayBody />}
      {isScoreboard && <Scoreboard />}
    </div>
  );
};

export default Body;
