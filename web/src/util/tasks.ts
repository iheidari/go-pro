import { ITasks } from "../context/type";

export const anyActiveTask = (tasks: ITasks) => {
  const activeNotif = Object.keys(tasks).findIndex(
    (id) => tasks[parseInt(id)].status === "started"
  );
  return activeNotif !== -1;
};

export const isEqualeTasks = (tasks1: ITasks, tasks2: ITasks) => {
  const oids1 = Object.keys(tasks1).map((id) => parseInt(id));
  const oids2 = Object.keys(tasks2).map((id) => parseInt(id));

  if (oids1.length !== oids2.length) {
    return false;
  }

  for (let i = 0; i < oids1.length; i++) {
    if (!oids2.includes(oids1[i])) {
      return false;
    }
    for (let j = 0; j < oids2.length; j++) {
      if (
        oids1[i] === oids2[j] &&
        tasks1[oids1[i]].status !== tasks2[oids2[j]].status
      ) {
        return false;
      }
    }
  }
  return true;
};

export const getJustFinishedTasks = (
  oldTasks: ITasks,
  newTasks: ITasks
): ITasks => {
  let toRet: ITasks = {};

  const newKeys = Object.keys(newTasks).map((id) => parseInt(id));

  for (let i = 0; i < newKeys.length; i++) {
    const newTask = newTasks[newKeys[i]];
    if (newTask.status === "finished") {
      if (!oldTasks[newKeys[i]]) {
        toRet = { ...toRet, [newKeys[i]]: newTask };
      }
      if (oldTasks[newKeys[i]] && oldTasks[newKeys[i]].status === "started") {
        toRet = { ...toRet, [newKeys[i]]: newTask };
      }
    }
  }
  return toRet;
};
