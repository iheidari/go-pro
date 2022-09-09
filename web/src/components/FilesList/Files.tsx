import FileRow from "./FileRow";
import { FileType } from "./type";

type Props = {
  files: FileType[];
  selectedVideo?: string;
  onVideoSelected: (file: string) => void;
};

const Files = ({ files, selectedVideo, onVideoSelected }: Props) => {
  const filesComponents = files.map((file: FileType) => (
    <FileRow
      key={file.file}
      file={file}
      selected={selectedVideo === file.file}
      handleClick={() => onVideoSelected(file.file)}
    />
  ));
  return (
    <div className="h-96 overflow-y-scroll border-2 p-2">{filesComponents}</div>
  );
};

export default Files;
