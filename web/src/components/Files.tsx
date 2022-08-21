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
  onPreview: (file: string) => void;
}

const Files = ({ path, onPreview }: FileListProps) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchList = async (path: string) => {
      const response = await api.get(`http://localhost:3001/file?path=${path}`);
      setFiles(response.data);
    };
    if (path) {
      fetchList(path);
    }
  }, [path]);

  if (!path) return null;

  const components = files.map((file: File) => (
    <FileRow
      key={file.name}
      file={file}
      handleClick={() => onPreview(file.file)}
    />
  ));
  return <div className="w-2/5">{components}</div>;
};

export default Files;
