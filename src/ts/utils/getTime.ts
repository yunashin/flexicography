export const getTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `0${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
