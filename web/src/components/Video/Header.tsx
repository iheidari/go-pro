import React, { Dispatch, useState } from "react";
import { IVideoActions, IVideoState } from "./reducer";
import api from "../../api";

type Props = {
  selectedVideo?: string;
  state: IVideoState;
  dispatch: Dispatch<IVideoActions>;
};

const Header = ({ selectedVideo, state, dispatch }: Props) => {
  const { autoPlay } = state;
  const [loading, setLoading] = useState<boolean>(false);
  const handleGetGps = async () => {
    if (selectedVideo) {
      setLoading(true);
      const response = await api.post(`/video/telemetry`, {
        file: selectedVideo,
      });
      setLoading(false);
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: "setGps", payload: { gps: response.data.data } });
        return;
      }
      return alert("Failed: " + response.status);
    }
  };
  const onAutoPlayChange = (event: React.FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "setAutoPlay",
      payload: { autoPlay: !!event.currentTarget.checked },
    });
  };
  return (
    <div className="mb-2 flex items-center gap-2">
      <div>
        <input
          id="chkAutoPlay"
          type="checkbox"
          onChange={onAutoPlayChange}
          checked={autoPlay}
        />
        <label className="ml-2" htmlFor="chkAutoPlay">
          Auto play
        </label>
      </div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleGetGps}
        >
          {loading ? "Loading..." : "Get GPS"}
        </button>
      </div>
    </div>
  );
};

export default Header;
