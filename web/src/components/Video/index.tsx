import { useRef, useReducer, useEffect } from "react";
import Cuts, { ICuts } from "./Cuts";
import Header from "./Header";
import appReducer from "./reducer";
import api from "../../api";

interface VideoProps {
  selectedVideo?: string;
}
const Video = ({ selectedVideo }: VideoProps) => {
  const [state, dispatch] = useReducer(appReducer, {
    videoCuts: {},
    error: "",
    autoPlay: false,
  });

  useEffect(() => {
    const saveCuts = async (file: string, cuts: ICuts[]) => {
      await api.post(`/video/cuts`, { file, cuts });
    };
    if (selectedVideo && state.videoCuts[selectedVideo])
      saveCuts(selectedVideo, state.videoCuts[selectedVideo]);
  }, [selectedVideo, state.videoCuts]);

  useEffect(() => {
    const getCuts = async (file: string) => {
      const response = await api.get(`/video/cuts?file=${file}`);
      if (response.status === 200) {
        dispatch({ type: "setCuts", payload: { file, cuts: response.data } });
      }
    };
    if (selectedVideo) {
      getCuts(selectedVideo);
    }
  }, [selectedVideo]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { autoPlay } = state;
  return (
    <div className="w-3/5">
      <Header {...{ state, dispatch }} />
      <video
        controls
        width="100%"
        src={`${process.env.REACT_APP_API_BASE_URL}${selectedVideo}`}
        autoPlay={autoPlay}
        id="video"
        ref={videoRef}
      >
        Sorry, your browser doesn't support embedded videos.
      </video>
      <Cuts
        {...{ state, dispatch, selectedVideo }}
        videoElement={videoRef.current}
      />
    </div>
  );
};

export default Video;
