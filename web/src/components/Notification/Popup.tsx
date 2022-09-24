import { ITasks } from "../../context/type";
import Row from "./Row";

type Props = {
  tasks: ITasks;
};

const Popup = ({ tasks }: Props) => {
  const Rows = tasks.map((task, index) => {
    return (
      <Row
        className={`${index === 0 ? "" : "border-t"} px-1 py-2`}
        key={task.id}
        task={task}
      />
    );
  });
  return (
    <div className={`float-right w-96 bg-white text-slate-900 rounded`}>
      {Rows}
    </div>
  );
};

export default Popup;
