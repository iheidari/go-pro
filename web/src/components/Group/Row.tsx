type RowProps = {
  file: string;
  selectedFile?: string;
  onFileSelected: (file: string) => void;
};

const Row = ({ file, selectedFile, onFileSelected }: RowProps) => {
  return (
    <div
      className={`h-6 ${
        file === selectedFile
          ? "font-bold bg-slate-100 text-slate-900"
          : "hover:cursor-pointer"
      }`}
      onClick={() => onFileSelected(file)}
    >
      {file}
    </div>
  );
};

export default Row;
