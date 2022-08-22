import { ICuts } from "./Cuts";

const twoDigits = (num: number): string => {
  if (num < 10) {
    return `0${num}`;
  }
  return num.toString();
};

const secondsToMinutes = (seconds: number): string => {
  const round = Math.round(seconds);

  return `${twoDigits(Math.floor(round / 60))}:${twoDigits(round % 60)}`;
};

const ARROW = " -> ";
const SEPERATOR = " ,";
export const stringify = (cuts: ICuts[]): string => {
  return cuts.reduce((acc, cur, index) => {
    acc += `${index > 0 ? SEPERATOR : ""}${secondsToMinutes(
      cur.start
    )}${ARROW}${cur.end ? secondsToMinutes(cur.end) : "end"}`;
    return acc;
  }, "");
};
