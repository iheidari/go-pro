import { useRef, useReducer, useEffect, useState } from "react";
import Cuts, { ICuts } from "./Cuts";
import Header from "./Header";
import appReducer from "./reducer";
import api from "../../api";
import Map from "../Map";

interface VideoProps {
  selectedVideo?: string;
}
const Video = ({ selectedVideo }: VideoProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [state, dispatch] = useReducer(appReducer, {
    videoCuts: {},
    error: "",
    autoPlay: false,
    gps: [],
  });

  useEffect(() => {
    const saveCuts = async (file: string, cuts: ICuts[]) => {
      await api.post(`/video/cuts`, { file, cuts });
    };
    if (selectedVideo && state.videoCuts[selectedVideo]) {
      saveCuts(selectedVideo, state.videoCuts[selectedVideo]);
    }
  }, [selectedVideo, state.videoCuts]);

  useEffect(() => {
    const getCuts = async (file: string) => {
      const response = await api.get(`/video/cuts?file=${file}`);
      if (response.status === 200) {
        dispatch({ type: "setCuts", payload: { file, cuts: response.data } });
      }
    };

    const getGps = async (file: string) => {
      const response = await api.get(`/video/telemetry?file=${file}`);
      if (response.status === 200) {
        dispatch({ type: "setGps", payload: { gps: response.data } });
        return;
      }
    };
    // reset gps data
    dispatch({ type: "setGps", payload: { gps: [] } });
    setCurrentFrame(0);

    if (selectedVideo) {
      getCuts(selectedVideo);
      getGps(selectedVideo);
    }
  }, [selectedVideo]);

  const handleTimeUpdate = (event: any) => {
    setCurrentFrame(Math.round(event.target.currentTime));
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const { autoPlay, gps } = state;
  return (
    <div className="w-3/5">
      <Header {...{ state, dispatch, selectedVideo }} />
      <video
        controls
        width="100%"
        src={`${process.env.REACT_APP_API_BASE_URL}${selectedVideo}`}
        autoPlay={autoPlay}
        id="video"
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
      >
        Sorry, your browser doesn't support embedded videos.
      </video>
      <Cuts
        {...{ state, dispatch, selectedVideo }}
        videoElement={videoRef.current}
      />
      <Map
        selectedVideo={selectedVideo}
        gpsData={gps}
        videoElement={videoRef.current}
        currentFrame={currentFrame}
      />
    </div>
  );
};

export default Video;
