import { useEffect, useState } from "react";
import api from "../../api";
import Group from "../Group";
import Files from "./Files";

interface FileListProps {
  path?: string;
  selectedVideo?: string;
  onVideoSelected: (file: string) => void;
}

const FilesList = ({ path, selectedVideo, onVideoSelected }: FileListProps) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const retrieveFiles = async () => {
      const response = await api.get(`/file?path=${path}`);
      setFiles(response.data);
    };
    retrieveFiles();
  }, [path]);

  return (
    <div className="w-2/5">
      <Files
        files={files}
        onVideoSelected={onVideoSelected}
        selectedVideo={selectedVideo}
      />
      <Group selectedVideo={selectedVideo} onFileSelected={onVideoSelected} />
    </div>
  );
};

export default FilesList;
