import { ITask, ITasks } from "../context/type";

export const anyActiveTask = (tasks: ITasks) => {
  const activeNotif = tasks.findIndex(
    (task: ITask) => task.status === "started"
  );
  return activeNotif !== -1;
};

export const isEqualeTasks = (tasks1: ITasks, tasks2: ITasks) => {
  if (tasks1.length !== tasks2.length) {
    return false;
  }

  for (let i = 0; i < tasks1.length; i++) {
    const task1 = tasks1[i];
    const task2Equivalent = tasks2.find((task) => task.id === task1.id);
    if (!task2Equivalent || task2Equivalent.status !== task1.status) {
      return false;
    }
  }
  return true;
};

export const getJustFinishedTasks = (
  oldTasks: ITasks,
  newTasks: ITasks
): ITasks => {
  let toRet: ITasks = [];

  for (let i = 0; i < newTasks.length; i++) {
    const newTask = newTasks[i];
    if (newTask.status === "finished") {
      const oldTaskEquivalent = oldTasks.find((task) => task.id === newTask.id);
      if (!oldTaskEquivalent || oldTaskEquivalent.status === "started") {
        toRet.push(newTask);
      }
    }
  }
  return toRet;
};

export const transferOnFinished = (
  oldTasks: ITasks,
  newTasks: ITasks
): ITasks => {
  const result: ITasks = [];
  newTasks.forEach((newTask) => {
    const oldTaskEquivalent = oldTasks.find((task) => task.id === newTask.id);
    result.push({ ...oldTaskEquivalent, ...newTask });
  });
  return result;
};
