import { useDataContext } from "../context/DataContext";

const FoundWords = ({ isDailyPuzzle }: { isDailyPuzzle?: boolean }) => {
  const { dailyFoundWords, foundWords } = useDataContext();

  const words = isDailyPuzzle ? dailyFoundWords : foundWords;

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
