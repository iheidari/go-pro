import React, { useEffect } from "react";
import { AppContextProps, ITask, ITasks } from "./type";
import api from "../api";
import {
  anyActiveTask,
  getJustFinishedTasks,
  isEqualeTasks,
  transferOnFinished,
} from "../util/tasks";

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContext = React.createContext<AppContextProps | null>(null);

let intervalID: null | NodeJS.Timer = null;

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tasks, setTasks] = React.useState<ITasks>([]);
  const [timerOn, setTimerOn] = React.useState<boolean>(false);

  useEffect(() => {
    if (timerOn && !intervalID) {
      intervalID = setInterval(async () => {
        const result = await api.get("/task");
        let finalTasks = [...tasks];
        if (result.status === 200 && !isEqualeTasks(result.data, tasks)) {
          finalTasks = transferOnFinished(tasks, result.data);
          setTasks(finalTasks);
          const justFinishedList = getJustFinishedTasks(tasks, finalTasks);
          justFinishedList.forEach((finishedTask) => {
            if (finishedTask.onFinish) {
              finishedTask.onFinish();
            }
          });
        }
        if (!anyActiveTask(finalTasks)) {
          if (intervalID) {
            clearInterval(intervalID);
          }
        }
      }, 1000);
    }
    return () => {
      if (intervalID) {
        clearInterval(intervalID);
        intervalID = null;
      }
    };
  }, [timerOn, tasks]);

  const addTask = (task: ITask): ITasks => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setTimerOn(true);
    return tasks;
  };

  const context = { tasks, addTask };
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
