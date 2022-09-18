import React from "react";
import { AppContextProps, ITask, ITasks } from "./type";
import api from "../api";
import {
  anyActiveTask,
  // getJustFinishedTasks,
  isEqualeTasks,
} from "../util/tasks";

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContext = React.createContext<AppContextProps | null>(null);

let intervalID: null | NodeJS.Timer = null;

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tasks, setTasks] = React.useState<ITasks>({});

  const startTimer = () => {
    intervalID = setInterval(async () => {
      const result = await api.get("/task");
      let finalTasks = { ...tasks };
      if (result.status === 200) {
        finalTasks = result.data;
        if (!isEqualeTasks(finalTasks, tasks)) {
          setTasks(finalTasks);
          // const justFinishedList = getJustFinishedTasks(tasks, finalTasks);
          // for (let key in justFinishedList) {
          //   if (typeof justFinishedList[key].onFinish === "function") {
          //     justFinishedList[key].onFinish();
          //   }
          // }
        }
      }
      if (!anyActiveTask(finalTasks)) {
        if (intervalID) {
          clearInterval(intervalID);
        }
      }
    }, 1000);
  };

  const addTask = (id: number, onFinish?: () => void): ITasks => {
    const newTask: ITask = { status: "started", onFinish };
    const newTasks = { ...tasks, [id]: newTask };
    setTasks(newTasks);
    startTimer();
    return newTasks;
  };
  const context = { tasks, addTask };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
