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
      <div>
        <div>{file.name}</div>
      </div>
      <div>{file.size}</div>
      <div>{file.birthtime.toString()}</div>
    </div>
  );
};

export default FileRow;
