import { useState, useEffect, useRef } from "react";
import Cuts, { ICuts } from "./Cuts";
import Header from "./Header";

type VideoProps = {
  previewFile?: string;
};

const Video = ({ previewFile }: VideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [cuts, setCuts] = useState<ICuts[]>([]);
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
      if (cuts.length === 0) {
        setCuts([{ start: 0, end: currentTime }]);
      }
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
      <Cuts
        cuts={cuts}
        onStart={handleStart}
        onEnd={handleEnd}
        onDelete={handleDelete}
        error={error}
      />
    </div>
  );
};

export default Video;
