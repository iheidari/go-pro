import { ITasks } from "../../context/type";
import Row from "./Row";

type Props = {
  tasks: ITasks;
};

const Popup = ({ tasks }: Props) => {
  const Rows = Object.keys(tasks).map((task, index) => {
    const oid = parseInt(task);
    return (
      <Row
        className={`${index === 0 ? "" : "border-t"} px-1 py-2`}
        key={task}
        id={oid}
        task={tasks[oid]}
      />
    );
  });
  return (
    <div className={`float-right w-52 bg-white text-slate-900 rounded`}>
      {Rows}
    </div>
  );
};

export default Popup;
