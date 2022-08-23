import React from "react";
import { formatSeconds } from "./util";

type TimeProps = {
  seconds: number;
  onClick: (time: number) => void;
  left?: boolean;
  right?: boolean;
};

const Time = ({ seconds, onClick, left, right }: TimeProps) => {
  return (
    <button
      className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ${
        left ? "rounded-l" : ""
      } ${right ? "rounded-r" : ""}`}
      onClick={() => onClick(seconds)}
    >
      {formatSeconds(seconds)}
    </button>
  );
};

export default Time;
