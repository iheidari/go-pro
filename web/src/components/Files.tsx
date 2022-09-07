import { useEffect, useState } from "react";
import api from "../api";
import FileRow from "./FileRow";

export type File = {
  file: string;
  path: string;
  extension?: string;
  name: string;
  birthtime: Date;
  size: number;
};

interface FileListProps {
  path?: string;
  selectedVideo?: string;
  onVideoSelected: (file: string) => void;
}

const Files = ({ path, selectedVideo, onVideoSelected }: FileListProps) => {
  useEffect(() => {
    const retrieveFiles = async () => {
      const response = await api.get(`/file?path=${path}`);
      setFiles(response.data);
    };
    retrieveFiles();
  }, [path]);

  const [files, setFiles] = useState([]);
  const handlePreview = (file: string) => () => {
    onVideoSelected(file);
  };

  const components = files.map((file: File) => (
    <FileRow
      key={file.file}
      file={file}
      selected={selectedVideo === file.file}
      handleClick={handlePreview(file.file)}
    />
  ));
  return <div className="w-2/5">{components}</div>;
};

export default Files;
