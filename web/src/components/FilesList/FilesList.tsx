import Group from "../Group";
import Files from "./Files";
import { FileType } from "./type";

interface FileListProps {
  files: FileType[];
  selectedVideo?: string;
  onVideoSelected: (file: string) => void;
}

const FilesList = ({
  files,
  selectedVideo,
  onVideoSelected,
}: FileListProps) => {
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
