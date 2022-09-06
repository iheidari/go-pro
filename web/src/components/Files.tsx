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
  files: File[];
  state: IAppState;
  dispatch: Dispatch<IAppActions>;
}

const Files = ({ files, state, dispatch }: FileListProps) => {
  const handlePreview = (file: string) => () => {
    dispatch({ type: "selectVideo", payload: { file } });
  };

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
