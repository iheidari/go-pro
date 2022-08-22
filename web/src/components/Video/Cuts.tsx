import { stringify } from "./util";

export interface ICuts {
  start: number;
  end?: number;
}

type CutsProps = {
  cuts: ICuts[];
  onStart: () => void;
  onEnd: () => void;
  onDelete: () => void;
  error: string;
};

const Cuts = ({ cuts, onStart, onEnd, onDelete, error }: CutsProps) => {
  return (
    <div>
      <div className="flex flex-row my-2">
        <button
          onClick={onStart}
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded-l"
          title="Start cut"
        >
          [
        </button>
        <button
          onClick={onEnd}
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 font-bold py-2 px-4 rounded-r"
          title="End cut"
        >
          ]
        </button>
        <div className="py-2 px-2">{stringify(cuts)}</div>
        {cuts.length > 0 && (
          <button
            onClick={onDelete}
            className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            title="Delete last cut"
          >
            {"<-"}
          </button>
        )}
      </div>
      <div className="text-red-700">{error}</div>
    </div>
  );
};

export default Cuts;
