import { Dispatch, useEffect, useState } from "react";
import api from "../api";
import { IAppActions, IAppState } from "../App.reducer";
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
  state: IAppState;
  dispatch: Dispatch<IAppActions>;
}

const Files = ({ path, state, dispatch }: FileListProps) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchList = async (path: string) => {
      const response = await api.get(`/file?path=${path}`);
      setFiles(response.data);
    };
    if (path) {
      fetchList(path);
    }
  }, [path]);

  const handlePreview = (file: string) => () => {
    dispatch({ type: "selectVideo", payload: { file } });
  };

  if (!path) return null;

  const components = files.map((file: File) => (
    <FileRow
      key={file.file}
      file={file}
      selected={state.selectedVideoFile === file.file}
      handleClick={handlePreview(file.file)}
    />
  ));
  return <div className="w-2/5">{components}</div>;
};

export default Files;
