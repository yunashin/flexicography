import { useDataContext } from "../context/DataContext";
import { generateScore } from "../utils/generateScore";
import { sortFoundWordsByScore } from "../utils/threeGramHelpers";

const SolutionWords = ({ solutions }: { solutions: string[] }) => {
  const { foundWords } = useDataContext();
  let totalScore = 0;
  const wordsAndScores = sortFoundWordsByScore(
    solutions.map((solution) => {
      const { wordScore } = generateScore(0, solution);
      totalScore += wordScore;
      return { word: solution, score: wordScore };
    })
  );

  return (
    <>
      <span className="flex">
        <p className="right-space">
          <b>Word Count:</b>
        </p>
        <p className="columbia word-count">{solutions.length}</p>
        <p className="right-space">
          <b>Score:</b>
        </p>
        <p className="columbia">{totalScore}</p>
      </span>
      {wordsAndScores.map((solution) => {
        const solutionFound = foundWords.some(
          (foundWord) => foundWord.word === solution.word
        );
        return (
          <p className={`found-word ${solutionFound && "columbia"}`}>
            {`${solution.word} (+${solution.score})`}
          </p>
        );
      })}
    </>
  );
};

export default SolutionWords;
