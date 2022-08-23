import { useState, useRef, Dispatch } from "react";
import { IAppActions, IAppState } from "../../App.reducer";
import Cuts from "./Cuts";
import Header from "./Header";

type VideoProps = {
  state: IAppState;
  dispatch: Dispatch<IAppActions>;
};

const Video = ({ state, dispatch }: VideoProps) => {
  const { selectedVideoFile, videoCuts, error } = state;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  // const [cuts, setCuts] = useState<ICuts[]>([]);
  // const [error, setError] = useState<string>("");

  // useEffect(() => {
  //   setCuts([]);
  // }, [previewFile]);

  if (!selectedVideoFile) {
    return null;
  }

  const cuts = videoCuts[selectedVideoFile] || [];

  const handleAutoPlayChange = (event: React.FormEvent<HTMLInputElement>) => {
    setAutoPlay(!!event.currentTarget.checked);
  };

  const handleStart = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      dispatch({
        type: "startCut",
        payload: { file: selectedVideoFile, start: currentTime, duration },
      });
    }
  };

  const handleEnd = () => {
    if (videoRef.current) {
      const { currentTime } = videoRef.current;
      dispatch({
        type: "endCut",
        payload: { file: selectedVideoFile, end: currentTime },
      });
    }
  };

  const handleDelete = () => {
    dispatch({
      type: "deleteCut",
      payload: { file: selectedVideoFile },
    });
  };

  return (
    <div className="w-3/5">
      <Header autoPlay={autoPlay} onAutoPlayChange={handleAutoPlayChange} />
      <video
        controls
        width="100%"
        src={`${process.env.REACT_APP_API_BASE_URL}${selectedVideoFile}`}
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
