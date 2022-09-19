import React, { Dispatch, useContext, useEffect, useState } from "react";
import { IVideoActions, IVideoState } from "./reducer";
import api from "../../api";
import Button from "../Basic/Button";
import { AppContext } from "../../context/appContext";

type Props = {
  selectedVideo?: string;
  state: IVideoState;
  dispatch: Dispatch<IVideoActions>;
};

const Header = ({ selectedVideo, state, dispatch }: Props) => {
  const { autoPlay, gps } = state;
  const context = useContext(AppContext);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const handleGetGps = async () => {
    if (selectedVideo) {
      setGpsLoading(true);
      const response = await api.post(`/video/telemetry`, {
        file: selectedVideo,
      });
      setGpsLoading(false);
      if (response.status === 200 || response.status === 201) {
        dispatch({ type: "setGps", payload: { gps: response.data } });
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

  const handleDeleteVideo = async () => {
    if (selectedVideo) {
      setDeleteLoading(true);
      const response = await api.delete(`/video/delete?file=${selectedVideo}`);
      if (response.status === 202) {
        if (context) {
          const onFinish = () => {
            context.getFiles();
          };
          context.addTask(response.data, onFinish);
        }
      }
      setDeleteLoading(false);
    }
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
      <Button
        onClick={handleGetGps}
        label={gpsLoading ? "Loading..." : "Get GPS"}
        disabled={!selectedVideo || (gps && gps.length > 0)}
      />
      <DeleteButton
        onClick={handleDeleteVideo}
        loading={deleteLoading}
        selectedVideo={selectedVideo}
      />
    </div>
  );
};

const DeleteButton = ({
  onClick,
  selectedVideo,
  loading,
}: {
  onClick: () => void;
  selectedVideo?: string;
  loading?: boolean;
}) => {
  const [confirm, setConfirm] = useState(false);
  useEffect(() => {
    setConfirm(false);
  }, [selectedVideo]);
  const handleDeleteVideo = () => {
    if (confirm) {
      onClick();
      setConfirm(false);
      return;
    }
    setConfirm(true);
  };
  return (
    <Button
      onClick={handleDeleteVideo}
      label={loading ? "Loading..." : confirm ? "Sure?" : "Delete"}
      disabled={!selectedVideo}
    />
  );
};

export default Header;
