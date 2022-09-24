import { useContext, useState } from "react";
import Button from "../Basic/Button";
import Textbox from "../Basic/Textbox";
import Row from "./Row";
import api from "../../api";
import { AppContext } from "../../context/appContext";

type GroupProps = {
  selectedVideo?: string;
  onFileSelected: (file: string) => void;
};

const Group = ({ selectedVideo, onFileSelected }: GroupProps) => {
  const [selectedFile, setSelectedFile] = useState<string | undefined>();
  const [mergeFileName, setMergeFileName] = useState<string>("");
  const [isMerging, setIsMerging] = useState<boolean>(false);
  const [groupFiles, setGroupFiles] = useState<string[]>([]);

  const appContext = useContext(AppContext);

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

  const handleGroupClear = () => {
    setGroupFiles([]);
    setMergeFileName("");
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
  const handleFileSelect = (file: string) => () => {
    setSelectedFile(file);
    onFileSelected(file);
  };
  const rows = groupFiles.map((file) => (
    <Row
      key={file}
      file={file}
      selectedFile={selectedFile}
      onFileSelected={handleFileSelect(file)}
    />
  ));

  const TopRow = () => (
    <div className="flex row gap-2 justify-center">
      <Button label="+" onClick={handleGroupAdd} />
      <Button
        label="-"
        disabled={!selectedFile}
        onClick={() => {
          if (selectedFile) {
            handleGroupRemove(selectedFile);
            setSelectedFile(undefined);
          }
        }}
      />
      <Button
        label="×"
        onClick={() => {
          handleGroupClear();
          setSelectedFile(undefined);
        }}
      />
    </div>
  );

  const LeftRow = () => (
    <div className="flex flex-col gap-2 w-1/12 justify-center">
      <Button
        label="▲"
        disabled={!selectedFile}
        onClick={() => {
          if (selectedFile) {
            handleUp(selectedFile);
          }
        }}
      />
      <Button
        label="▼"
        disabled={!selectedFile}
        onClick={() => {
          if (selectedFile) {
            handleDown(selectedFile);
          }
        }}
      />
    </div>
  );

  const Rows = () => (
    <div className="h-36 overflow-y-scroll border-2 p-2 w-11/12">{rows}</div>
  );

  const handleMergeRequest = async () => {
    const output = mergeFileName
      .replace(/ /g, "-")
      .toLowerCase()
      .endsWith(".mp4")
      ? mergeFileName
      : mergeFileName + ".MP4";

    setIsMerging(true);
    try {
      const response = await api.post("/video/merge", {
        files: groupFiles,
        output,
      });
      setIsMerging(false);
      if (appContext) {
        const onFinish = () => {
          appContext.getFiles();
        };
        appContext.addTask(response.data, onFinish);
      }
    } catch (error) {
      setIsMerging(false);
      console.error("failed request to merge videos");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-2">
      <TopRow />
      <div className="flex gap-2">
        <LeftRow />
        <Rows />
      </div>
      <div className="flex flex-row gap-2 items-baseline">
        <div>Merge File Name: </div>
        <div className="w-3/6">
          <Textbox
            name="mergeFileName"
            value={mergeFileName}
            onChange={(value) => setMergeFileName(value)}
          />
        </div>
        <Button
          disabled={groupFiles.length < 2 || !mergeFileName}
          label="Merge"
          onClick={handleMergeRequest}
          isLoading={isMerging}
          title={
            groupFiles.length < 2
              ? "You need at least 2 files to start merging"
              : mergeFileName
              ? ""
              : "Please enter a name for merge file"
          }
        />
      </div>
    </div>
  );
};

export default Group;
