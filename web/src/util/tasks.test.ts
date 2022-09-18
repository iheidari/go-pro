import { ITasks } from "../context/type";
import { anyActiveTask, getJustFinishedTasks, isEqualeTasks } from "./tasks";

describe("anyActiveTask", () => {
  test("anyActiveTask return true with any started notif", () => {
    expect(anyActiveTask({ 1: { status: "started" } })).toBe(true);
  });
  test("anyActiveTask return false with no started notif", () => {
    expect(anyActiveTask({ 1: { status: "finished" } })).toBe(false);
  });
});

describe("isEqualeTasks", () => {
  const group1: ITasks = {
    1: { status: "started" },
    2: { status: "error" },
    3: { status: "started" },
  };

  const group2: ITasks = {
    3: { status: "started" },
    1: { status: "started" },
    2: { status: "error" },
  };

  const group3: ITasks = {
    1: { status: "started" },
    2: { status: "started" },
    3: { status: "error" },
  };

  const group4: ITasks = {
    1: { status: "started" },
    2: { status: "started" },
    4: { status: "error" },
  };

  test("isEqualeTasks return true with 2 similar group", () => {
    expect(isEqualeTasks(group1, group2)).toBe(true);
  });
  test("isEqualeTasks return false with 2 different group", () => {
    expect(isEqualeTasks(group1, group3)).toBe(false);
    expect(isEqualeTasks(group3, group4)).toBe(false);
  });
});

describe("getJustFinishedTasks", () => {
  const group1: ITasks = {
    1: { status: "started" },
    2: { status: "error" },
    3: { status: "started" },
  };

  const group2: ITasks = {
    3: { status: "started" },
    1: { status: "error" },
    2: { status: "started" },
  };

  const group3: ITasks = {
    1: { status: "started" },
    2: { status: "started" },
    3: { status: "finished" },
  };

  const group4: ITasks = {
    1: { status: "finished" },
    2: { status: "error" },
    4: { status: "finished" },
  };
  const group5: ITasks = {
    1: { status: "finished" },
    2: { status: "error" },
    3: { status: "finished" },
    4: { status: "finished" },
  };

  test("getJustFinishedTasks return justfinished tasks", () => {
    expect(Object.keys(getJustFinishedTasks(group1, group2)).length).toBe(0);
    expect(Object.keys(getJustFinishedTasks(group1, group3)).length).toBe(1);
    expect(Object.keys(getJustFinishedTasks(group1, group4)).length).toBe(2);
    expect(Object.keys(getJustFinishedTasks(group1, group5)).length).toBe(3);
  });
});
