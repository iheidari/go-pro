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

  const [groupFiles, setGroupFiles] = useState<string[]>([]);

  const handleGroupAdd = () => {
    if (selectedVideo && !groupFiles.includes(selectedVideo)) {
      setGroupFiles((groupFiles) => [...groupFiles, selectedVideo]);
    }
  };

  const handleGroupRemove = (file: string) => {
    setGroupFiles((groupFiles) =>
      groupFiles.filter((groupFile) => groupFile !== file)
    );
  };

  const handleUp = (file: string) => {
    const index = groupFiles.indexOf(file);
    if (index > 0) {
      const newGroupFile = [...groupFiles];

      const temp = newGroupFile[index - 1];
      newGroupFile[index - 1] = file;
      newGroupFile[index] = temp;

      setGroupFiles(newGroupFile);
    }
  };

  const handleDown = (file: string) => {
    const index = groupFiles.indexOf(file);
    if (index > -1 && index !== groupFiles.length - 1) {
      const newGroupFile = [...groupFiles];

      const temp = newGroupFile[index + 1];
      newGroupFile[index + 1] = file;
      newGroupFile[index] = temp;

      setGroupFiles(newGroupFile);
    }
  };

  return (
    <div className="w-2/5">
      <Files
        files={files}
        onVideoSelected={onVideoSelected}
        selectedVideo={selectedVideo}
      />
      <Group
        files={groupFiles}
        onAdd={handleGroupAdd}
        onRemove={handleGroupRemove}
        onUp={handleUp}
        onDown={handleDown}
        onFileSelected={onVideoSelected}
      />
    </div>
  );
};

export default FilesList;
