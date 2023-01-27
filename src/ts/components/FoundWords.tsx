import { useDataContext } from "../context/DataContext";

const FoundWords = () => {
  const { foundWords } = useDataContext();

  return (
    <div className="top-space">
      {foundWords.length > 0 && (
        <div>
          <b>Found words</b>
        </div>
      )}
      {foundWords.map((foundWord) => (
        <p className="found-word">
          {`${foundWord.word} (+${foundWord.score})`}
        </p>
      ))}
    </div>
  );
};

export default FoundWords;
