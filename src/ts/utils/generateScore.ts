export const generateScore = (score: number, word: string) => {
  let wordScore = 0;
  for (const letter of word) {
    if (['a', 'e', 'i', 'o', 'u', 'l', 'n', 's', 't', 'r'].includes(letter)) {
      wordScore += 1;
    } else if (['d', 'g'].includes(letter)) {
      wordScore += 2;
    } else if (['b', 'c', 'm', 'p'].includes(letter)) {
      wordScore += 3;
    } else if (['f', 'h', 'v', 'w', 'y'].includes(letter)) {
      wordScore += 4;
    } else if (letter === 'k') {
      wordScore += 5;
    } else if (['j', 'x'].includes(letter)) {
      wordScore += 8;
    } else if (['q', 'z'].includes(letter)) {
      wordScore += 10;
    }
  }

  return { totalScore: score + wordScore, wordScore };
}