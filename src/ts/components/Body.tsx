import { useCallback, useEffect, useState } from "react";

import { useDataContext } from "../context/DataContext";
import { generateScore } from "../utils/generateScore";
import FoundWords from "./FoundWords";
import SolutionWords from "./SolutionWords";

const Body = () => {
  const [input, setInput] = useState('');
  const [showFoundWords, setShowFoundWords] = useState(true);
  const [isTimedMode, setIsTimedMode] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const { 
    fetched, 
    foundWords, 
    score,
    secondsLeft,
    threeGram, 
    wordCount, 
    words, 
    addFoundWord,
    clearFoundWords,
    setFetched,
    setScore,
    setSecondsLeft,
    setWordCount,
  } = useDataContext();

  const solutions: string[] = words.filter(word => word.includes(threeGram.toLowerCase()));

  const startTimer = useCallback(() => setTimeout(() => {
    if (secondsLeft === 0) {
      setIsTimeUp(true);
    } else {
      setSecondsLeft(secondsLeft - 1);
    }
  }, 1000), [secondsLeft, setSecondsLeft]);

  useEffect(() => {
    if (isTimedMode && !isTimeUp) {
      startTimer();
    }
  }, [isTimedMode, isTimeUp, startTimer]);

  return (
    <div className="body">
      <div className="intro">
        Flex your lexicographical skills in this simple word game!
      </div>
      <div className="intro">
        Enter as many words as you can that contain the following letters in consecutive order:
      </div>
      {fetched ? <p className='three-gram'>{threeGram}</p> : <p className="three-gram">...</p>}
      <span className='flex'>
        <p className="right-space"><b>Word Count:</b></p>
        <p className="columbia word-count">{wordCount}</p>
        <p className="right-space"><b>Score:</b></p>
        <p className="columbia">{score}</p>
      </span>
      <input
        autoFocus={true} 
        onChange={({target: {value}}) => {
          const foundWord = value.toLowerCase();
          if (
            solutions.includes(foundWord) && 
            !foundWords.some(wordAndScore => wordAndScore.word === foundWord)
          ) {
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
        disabled={isTimeUp}
      />
      <span className="flex">
        <button className="sm-button right-space" onClick={() => {
          setIsTimedMode(!isTimedMode);
          clearFoundWords();
          setScore(0);
          setWordCount(0);
          setIsTimeUp(false);
          setSecondsLeft(60);
          setShowFoundWords(true);
        }}>
          {isTimedMode ? 'Play without timer' : 'Play timed mode'}
        </button>
        <button 
          className="sm-button right-space" 
          disabled={isTimedMode && !isTimeUp} 
          onClick={() => setShowFoundWords(!showFoundWords)}
          >
          {showFoundWords ? 'Show all solutions' : 'Show found words'}
        </button>
        <button className="sm-button" onClick={() => {
          setFetched(false);
          setIsTimedMode(false);
          clearFoundWords();
          setScore(0);
          setShowFoundWords(true);
          setWordCount(0);
          setIsTimeUp(false);
          setSecondsLeft(60);
        }}>
          Replay
        </button>
      </span>
      {isTimedMode && 
        <span className="flex">
          <p className="right-space"><b>Time left:</b></p>
          <p>{`00:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`}</p>
        </span>
      }
      {showFoundWords ? <FoundWords /> : <SolutionWords solutions={solutions} />}
    </div>
  );
}

export default Body;
