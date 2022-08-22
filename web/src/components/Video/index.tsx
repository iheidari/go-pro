import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import { stringify } from "./util";

type VideoProps = {
  previewFile?: string;
};

export interface Cuts {
  start: number;
  end?: number;
}

const Video = ({ previewFile }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [cuts, setCuts] = useState<Cuts[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setCuts([]);
  }, [previewFile]);

  if (!previewFile) {
    return null;
  }

  const handleAutoPlayChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAutoPlay(!!event.currentTarget.checked);
  };

  const handleStart = () => {
    if (videoRef.current) {
      setError("");
      const { currentTime } = videoRef.current;
      if (cuts.length === 0) {
        return setCuts([{ start: currentTime }]);
      }
      if (
        currentTime < (cuts[cuts.length - 1].end || 0) ||
        currentTime < cuts[cuts.length - 1].start
      ) {
        return setError("Bad Start time");
      }
      if (cuts[cuts.length - 1].end) {
        return setCuts((cuts) => [...cuts, { start: currentTime }]);
      }
      const newCuts = [...cuts];
      newCuts[newCuts.length - 1].start = currentTime;
      setCuts(newCuts);
    }
  };

  const handleEnd = () => {
    if (videoRef.current) {
      const { currentTime } = videoRef.current;
      const newCuts = [...cuts];
      newCuts[newCuts.length - 1].end = currentTime;
      setCuts(newCuts);
    }
  };

  const handleDelete = () => {
    if (cuts.length > 0) {
      setCuts((cuts) =>
        cuts.filter((c, index, all) => index !== all.length - 1)
      );
    }
  };

  return (
    <div className="w-3/5">
      <Header autoPlay={autoPlay} onAutoPlayChange={handleAutoPlayChange} />
      <video
        controls
        width="100%"
        src={previewFile}
        autoPlay={autoPlay}
        id="video"
        ref={videoRef}
      >
        Sorry, your browser doesn't support embedded videos.
      </video>
      <div>
        <div className="flex flex-row my-2">
          <button
            onClick={handleStart}
            className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded-l"
          >
            Start
          </button>
          <button
            onClick={handleEnd}
            className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded-r"
          >
            End
          </button>
          <div className="py-2 px-2">{stringify(cuts)}</div>
          {cuts.length > 0 && (
            <button
              onClick={handleDelete}
              className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
              Delete
            </button>
          )}
        </div>
        <div className="text-red-700">{error}</div>
      </div>
    </div>
  );
};

export default Video;
