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
      <div className="intro">
        Flex your lexicographical skills in this simple word game!
      </div>
      <div className="intro">
        Enter as many words as you can that contain the following letters in consecutive order:
      </div>
      {fetched ? <p className='three-gram'>{threeGram}</p> : <p>Generating a three letter combination...</p>}
      <span className='flex'>
        <p className="right-space">Word Count:</p>
        <p className="columbia word-count">{wordCount}</p>
        <p className="right-space">Score:</p>
        <p className="columbia">{score}</p>
      </span>
      <input
        autoFocus={true} 
        onChange={({target: {value}}) => {
          const foundWord = value.toLowerCase();
          if (solutions.includes(foundWord) && !foundWords.some(wordAndScore => wordAndScore.word === foundWord)) {
            const { totalScore, wordScore } = generateScore(score, foundWord);
            setInput('');
            setWordCount(wordCount + 1);
            addFoundWord(foundWord, wordScore);
            setScore(totalScore);
          } else {
            setInput(value)
          }
        }} 
        type="text" 
        value={input} 
      />
      {foundWords.length > 0 && (
        <p>Found words</p>
      )}
      {foundWords.map(foundWord => <p className="found-word">{`${foundWord.word} (+${foundWord.score})`}</p>)}
    </div>
  );
}

export default Body;
