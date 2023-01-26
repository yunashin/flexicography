import { useDataContext } from "../context/DataContext";

const FoundWords = () => {
  const { foundWords } = useDataContext();

  return (
    <>
      {foundWords.length > 0 && (
        <p><b>Found words</b></p>
      )}
      {foundWords.map(foundWord => 
        <p className="found-word">
          {`${foundWord.word} (+${foundWord.score})`}
        </p>
      )}
    </>
  );
}

export default FoundWords;
