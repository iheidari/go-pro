import { useEffect, useState } from "react";
import api from "../api";

export type File = {
  file: string;
  path: string;
  extension?: string;
  name: string;
  birthtime: Date;
  size: number;
};

interface FileListProps {
  path: string;
}
const FileRow = ({ file }: { file: File }) => {
  return (
    <div className="grid gap-4 grid-cols-4">
      <div>
        <a href={`http://localhost:3001${file.file.replace(/\\/g, "/")}`}>
          {file.name}
        </a>
      </div>
      <div>{file.size}</div>
      <div>{file.birthtime.toString()}</div>
    </div>
  );
};

const Files = ({ path }: FileListProps) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchList = async (path: string) => {
      console.log("🚀 ~ file: Files.tsx ~ line 24 ~ fetchList ~ path", path);
      const response = await api.get(`http://localhost:3001/file?path=${path}`);
      console.log("🚀 ~ file: FileList.tsx ~ line 12 ~ fetchList ~ response");
      setFiles(response.data);
    };
    if (path) {
      fetchList(path);
    }
  }, [path]);

  const components = files.map((file) => <FileRow file={file} />);
  return <div>{components}</div>;
};

export default Files;
