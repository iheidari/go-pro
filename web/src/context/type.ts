export type ITasks = ITask[];
export interface IServerTask {
  id: number;
  status: "started" | "finished" | "error";
  name: string;
}
export interface ITask extends IServerTask {
  onFinish?: () => void;
}

export type FileType = {
  file: string;
  path: string;
  extension?: string;
  name: string;
  birthtime: Date;
  size: number;
};

export interface AppContextProps {
  tasks: ITasks;
  files: FileType[];
  addTask: (serverTask: IServerTask, onFinish?: () => void) => ITasks;
  getFiles: (route?: string) => void;
}
