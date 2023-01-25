import { useState } from "react";

import { useDataContext } from "../context/DataContext";
import { generateScore } from "../utils/generateScore";

const Body = () => {
  const [input, setInput] = useState('');
  const { 
    fetched, 
    foundWords, 
    score,
    threeGram, 
    wordCount, 
    words, 
    addFoundWord, 
    setScore,
    setWordCount,
  } = useDataContext();

  const solutions = words.filter(word => word.includes(threeGram.toLowerCase()));

  return (
    <div className="body">
      <p>
      Enter as many words as you can using the following letters in consecutive order:
      </p>
      {fetched ? <p className='three-gram'>{threeGram}</p> : <p>Generating a three letter combination...</p>}
      <span className='flex'>
        <p className='word-count'>{`Word Count: ${wordCount}`}</p>
        <p>Score: {score}</p>
      </span>
      <input onChange={({target: {value}}) => {
        const foundWord = value.toLowerCase();
        if (solutions.includes(value) && !foundWords.some(wordAndScore => wordAndScore.word === foundWord)) {
          const { totalScore, wordScore } = generateScore(score, foundWord);
          setInput('');
          setWordCount(wordCount + 1);
          addFoundWord(foundWord, wordScore);
          setScore(totalScore);
        } else {
          setInput(value)
        }
      }} type="text" value={input} />
      {foundWords.length > 0 && (
        <p>Found words:</p>
      )}
      {foundWords.map(foundWord => <p className="found-word">{`${foundWord.word} (+${foundWord.score})`}</p>)}
    </div>
  );
}

export default Body;
