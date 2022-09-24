import { ITask } from "../../context/type";
import Error from "../Icons/Error";
import Loading from "../Icons/Loading";
import Success from "../Icons/Success";
import "./animation.css";

function getIcon(task: ITask) {
  switch (task.status) {
    case "started":
      return <Loading className="rotating" />;
    case "error":
      return <Error />;
    case "finished":
      return <Success />;
  }
}

interface RowProps {
  task: ITask;
  className?: string;
}

const Row = ({ task, className }: RowProps) => {
  const icon = getIcon(task);
  return (
    <div className={className + " flex gap-1"}>
      <div className="w-6">{icon}</div>
      {task.name}
    </div>
  );
};
export default Row;
