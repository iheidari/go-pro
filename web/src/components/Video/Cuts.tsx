import { Dispatch } from "react";
import { IVideoActions, IVideoState } from "./reducer";
import Time from "./Time";

export interface ICuts {
  start: number;
  end: number;
}

type CutsProps = {
  selectedVideo?: string;
  videoElement: HTMLVideoElement | null;
  state: IVideoState;
  dispatch: Dispatch<IVideoActions>;
};

const Cuts = ({ selectedVideo, videoElement, state, dispatch }: CutsProps) => {
  if (!selectedVideo) {
    return <div className="my-2 h-12"></div>;
  }

  const { videoCuts, error } = state;

  const cuts = videoCuts[selectedVideo] || [];

  const handleStart = () => {
    if (videoElement) {
      const { currentTime, duration } = videoElement;
      dispatch({
        type: "startCut",
        payload: { file: selectedVideo, start: currentTime, duration },
      });
    }
  };

  const handleEnd = () => {
    if (videoElement) {
      const { currentTime } = videoElement;
      dispatch({
        type: "endCut",
        payload: { file: selectedVideo, end: currentTime },
      });
    }
  };

  const handleDelete = () => {
    dispatch({
      type: "deleteCut",
      payload: { file: selectedVideo },
    });
  };

  const handleTimeClick = (time: number) => {
    if (videoElement) {
      videoElement.currentTime = time;
    }
  };

  return (
    <div>
      <div className="flex flex-row my-2">
        <button
          onClick={handleStart}
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded-l"
          title="Start cut"
        >
          [
        </button>
        <button
          onClick={handleEnd}
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded-r"
          title="End cut"
        >
          ]
        </button>
        <div className="flex flex-wrap">
          {cuts.map((cut) => (
            <div className="flex mx-1 my-1">
              <Time seconds={cut.start} left onClick={handleTimeClick} />{" "}
              <Time seconds={cut.end} right onClick={handleTimeClick} />
            </div>
          ))}
        </div>
        {cuts.length > 0 && (
          <button
            onClick={handleDelete}
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            title="Delete last cut"
          >
            {"<-"}
          </button>
        )}
      </div>
      <div className="text-red-700">{error}</div>
    </div>
  );
};

export default Cuts;
