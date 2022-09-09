import React, { useState } from "react";
import Button from "../Basic/Button";

type GroupProps = {
  files: string[];
  onAdd: () => void;
  onRemove: (file: string) => void;
  onUp: (file: string) => void;
  onDown: (file: string) => void;
  onFileSelected: (file: string) => void;
};

const Group = ({
  files,
  onAdd,
  onRemove,
  onUp,
  onDown,
  onFileSelected,
}: GroupProps) => {
  const [selectedFile, setSelectedFile] = useState<string | undefined>();
  const rows = files.map((file) => (
    <div
      key={file}
      className={`h-6 ${
        file === selectedFile ? "font-bold" : "hover:cursor-pointer"
      }`}
      onClick={() => {
        setSelectedFile(file);
        onFileSelected(file);
      }}
    >
      {file}
    </div>
  ));
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex row gap-3 justify-center">
        <Button label="+" onClick={onAdd} />
        {selectedFile && (
          <Button
            label="-"
            onClick={() => {
              onRemove(selectedFile);
              setSelectedFile(undefined);
            }}
          />
        )}
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-1/12 justify-center">
          {selectedFile && (
            <Button label="▲" onClick={() => onUp(selectedFile)} />
          )}
          {selectedFile && (
            <Button label="▼" onClick={() => onDown(selectedFile)} />
          )}
        </div>
        <div className="h-36 overflow-y-scroll border-2 p-2 w-11/12">
          {rows}
        </div>
      </div>
    </div>
  );
};

export default Group;
