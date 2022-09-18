export interface ITasks {
  [id: number]: ITask;
}
export interface ITask {
  status: "started" | "finished" | "error";
  name?: string;
  onFinish?: () => void;
}

export interface AppContextProps {
  tasks: ITasks;
  addTask: (id: number, onFinish?: () => void) => ITasks;
}
