import React, { useEffect } from "react";
import { AppContextProps, FileType, IServerTask, ITask, ITasks } from "./type";
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
let currentRoute: null | string = null;

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [tasks, setTasks] = React.useState<ITasks>([]);
  const [files, setFiles] = React.useState<FileType[]>([]);
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

  const addTask = (serverTask: IServerTask, onFinish?: () => void): ITasks => {
    const { id, name, status } = serverTask;
    const task: ITask = { id, name, status, onFinish };
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    setTimerOn(true);
    return tasks;
  };

  const getFiles = (route?: string) => {
    if (route) {
      currentRoute = route;
    }
    if (!currentRoute) {
      return;
    }
    api
      .get(`/file?path=${currentRoute}`)
      .then((response) => {
        setFiles(response.data);
      })
      .catch((error) => {
        console.error(
          `Retrieving the videos for route ${currentRoute} failed.`
        );
        console.error(error);
      });
  };
  const context = { tasks, files, addTask, getFiles };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};
