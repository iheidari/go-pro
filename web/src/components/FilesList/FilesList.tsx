import { useContext } from "react";
import { AppContext } from "../../context/appContext";
import Group from "../Group";
import Files from "./Files";

interface FileListProps {
  selectedVideo?: string;
  onVideoSelected: (file: string) => void;
}

const FilesList = ({ selectedVideo, onVideoSelected }: FileListProps) => {
  const context = useContext(AppContext);
  if (!context) {
    return null;
  }
  return (
    <div className="w-2/5">
      <Files
        files={context.files}
        onVideoSelected={onVideoSelected}
        selectedVideo={selectedVideo}
      />
      <Group selectedVideo={selectedVideo} onFileSelected={onVideoSelected} />
    </div>
  );
};

export default FilesList;
