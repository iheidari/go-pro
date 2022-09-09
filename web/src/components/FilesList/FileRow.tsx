import { FileType } from "./type";
import { bytesToSize } from "./util";

interface FileRowProps {
  file: FileType;
  handleClick: () => void;
  selected: boolean;
}

const FileRow = ({ file, handleClick, selected }: FileRowProps) => {
  const onClick = (event: any) => {
    event.preventDefault();
    handleClick();
  };
  return (
    <div
      className={`flex flex-row gap-8 w-full hover:bg-sky-100 hover:text-slate-900 ${
        selected
          ? "bg-sky-100 font-semibold text-slate-900"
          : "hover:cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="w-5/12">{file.name}</div>
      <div className="w-2/12">{bytesToSize(file.size)}</div>
      <div className="w-5/12">{new Date(file.birthtime).toLocaleString()}</div>
    </div>
  );
};

export default FileRow;
