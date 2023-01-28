type DailyPuzzleScore = {
  day: string;
  letters: string;
  score: number;
  wordCount: number;
};

export type DailyPuzzleScores = DailyPuzzleScore[];

export type FoundWord = {
  score: number;
  word: string;
};
