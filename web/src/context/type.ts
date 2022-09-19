export type ITasks = ITask[];
export interface ITask {
  id: number;
  status: "started" | "finished" | "error";
  name: string;
  onFinish?: () => void;
}

export interface AppContextProps {
  tasks: ITasks;
  addTask: (task: ITask) => ITasks;
}
