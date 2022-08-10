import { File } from "./Files";

const FileRow = ({
  file,
  handleClick,
}: {
  file: File;
  handleClick: () => void;
}) => {
  const onClick = (event: any) => {
    event.preventDefault();
    handleClick();
  };
  return (
    <div
      className="grid gap-4 grid-cols-4 hover:bg-sky-100 hover:cursor-pointer"
      onClick={onClick}
    >
      <div>{file.name}</div>
      <div className="w-16">{bytesToSize(file.size)}</div>
      <div>{new Date(file.birthtime).toLocaleString()}</div>
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
