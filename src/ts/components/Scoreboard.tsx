import { DailyPuzzleScores } from "../types/types";

const Scoreboard = () => {
  const dailyPuzzleScores: DailyPuzzleScores = JSON.parse(
    window.localStorage.getItem("dailyPuzzleScores") || "[]"
  );

  const content =
    dailyPuzzleScores.length === 0 ? (
      <p>Play a daily puzzle to see your high scores.</p>
    ) : (
      <div>
        {dailyPuzzleScores.map((item) => {
          return (
            <div className="bottom-space" key={item.day}>
              <div className="right-space">{`${item.day}: ${item.letters}`}</div>
              <span className="flex">
                <div className="right-space">
                  <b>Word count:</b>
                </div>
                <div className="columbia word-count">{item.wordCount}</div>
                <div className="right-space">
                  <b>High score:</b>
                </div>
                <div className="columbia">{item.score}</div>
              </span>
            </div>
          );
        })}
      </div>
    );

  return (
    <>
      <p>
        <b>Daily Puzzle High Scores</b>
      </p>
      {content}
    </>
  );
};

export default Scoreboard;
