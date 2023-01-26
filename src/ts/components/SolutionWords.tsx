import { generateScore } from "../utils/generateScore";

const SolutionWords = ({ solutions }: { solutions: string[] }) => {
  let totalScore = 0;
  const wordsAndScores = solutions.map(solution => {
    const { wordScore } = generateScore(0, solution);
    totalScore += wordScore;
    return { word: solution, score: wordScore };
  }).sort((solutionA, solutionB) => solutionB.score - solutionA.score);

  return (
    <>
      <span className='flex'>
        <p className="right-space"><b>Word Count:</b></p>
        <p className="columbia word-count">{solutions.length}</p>
        <p className="right-space"><b>Score:</b></p>
        <p className="columbia">{totalScore}</p>
      </span>
      {wordsAndScores.map(solution => {
        return (
          <p className="found-word">
            {`${solution.word} (+${solution.score})`}
          </p>
        )
      })}
    </>
  )
}

export default SolutionWords;