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
      <p><b>{`Total possible score: ${totalScore}`}</b></p>
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