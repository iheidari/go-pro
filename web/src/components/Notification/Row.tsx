import { ITask } from "../../context/type";
import Error from "../Icons/Error";
import Loading from "../Icons/Loading";
import Success from "../Icons/Success";

function getIcon(task: ITask) {
  switch (task.status) {
    case "started":
      return <Loading />;
    case "error":
      return <Error />;
    case "finished":
      return <Success />;
  }
}
const Row = ({
  id,
  task,
  className,
}: {
  id: number;
  task: ITask;
  className?: string;
}) => {
  const icon = getIcon(task);
  return (
    <div className={className + " flex gap-1"}>
      <div className="w-6">{icon}</div>
      {task.name || id}
    </div>
  );
};
export default Row;
