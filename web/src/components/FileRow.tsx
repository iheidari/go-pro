import { File } from "./Files";

interface FileRowProps {
  file: File;
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
      className={`flex flex-row gap-8 w-full hover:bg-sky-100 ${
        selected ? "bg-sky-100 font-semibold" : "hover:cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="w-5/12">{file.name}</div>
      <div className="w-2/12">{bytesToSize(file.size)}</div>
      <div className="w-5/12">{new Date(file.birthtime).toLocaleString()}</div>
    </div>
  );
};

const bytesToSize = (bytes: number) => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  var i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
};

export default FileRow;
