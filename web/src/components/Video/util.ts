const twoDigits = (num: number): string => {
  if (num < 10) {
    return `0${num}`;
  }
  return num.toString();
};

export const formatSeconds = (seconds: number): string => {
  const round = Math.round(seconds);

  return `${twoDigits(Math.floor(round / 60))}:${twoDigits(round % 60)}`;
};
