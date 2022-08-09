import React from "react";

type VideoProps = {
  previewFile?: string;
};

const Video = ({ previewFile }: VideoProps) => {
  if (!previewFile) {
    return null;
  }
  return (
    <div className="my-3">
      <video controls width="100%" src={previewFile}>
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  );
};

export default Video;
