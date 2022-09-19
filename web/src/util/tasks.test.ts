import { ITasks } from "../context/type";
import {
  anyActiveTask,
  getJustFinishedTasks,
  isEqualeTasks,
  transferOnFinished,
} from "./tasks";

const group1: ITasks = [
  { id: 1, name: "task1", status: "started" },
  { id: 2, name: "task2", status: "error" },
  { id: 3, name: "task3", status: "started" },
];

const group2: ITasks = [
  { id: 1, name: "task1", status: "started" },
  { id: 2, name: "task2", status: "error" },
  { id: 3, name: "task3", status: "started" },
];

const group3: ITasks = [
  { id: 1, name: "task1", status: "started" },
  { id: 2, name: "task2", status: "started" },
  { id: 3, name: "task3", status: "finished" },
];

const group4: ITasks = [
  { id: 1, name: "task1", status: "started" },
  { id: 2, name: "task2", status: "error" },
  { id: 4, name: "task4", status: "started" },
];

const group5: ITasks = [
  { id: 1, name: "task1", status: "finished" },
  { id: 2, name: "task2", status: "error" },
  { id: 3, name: "task3", status: "finished" },
  { id: 4, name: "task4", status: "finished" },
];
const group6: ITasks = [
  { id: 1, name: "task1", status: "started", onFinish: () => 0 },
  { id: 2, name: "task2", status: "error" },
  { id: 3, name: "task3", status: "started" },
];

describe("anyActiveTask", () => {
  test("anyActiveTask return true with any started notif", () => {
    expect(anyActiveTask(group1)).toBe(true);
  });
  test("anyActiveTask return false with no started notif", () => {
    expect(anyActiveTask(group5)).toBe(false);
  });
});

describe("isEqualeTasks", () => {
  test("isEqualeTasks return true with 2 similar group", () => {
    expect(isEqualeTasks(group1, group2)).toBe(true);
  });
  test("isEqualeTasks return false with 2 different group", () => {
    expect(isEqualeTasks(group1, group5)).toBe(false);
    expect(isEqualeTasks(group1, group4)).toBe(false);
    expect(isEqualeTasks(group1, group3)).toBe(false);
  });
});

describe("getJustFinishedTasks", () => {
  test("getJustFinishedTasks return justfinished tasks", () => {
    expect(getJustFinishedTasks(group1, group2).length).toBe(0);
    expect(getJustFinishedTasks(group1, group3).length).toBe(1);
    expect(getJustFinishedTasks(group1, group4).length).toBe(0);
    expect(getJustFinishedTasks(group1, group5).length).toBe(3);
  });
});

describe("transferOnFinished", () => {
  test("transferOnFinished transfer all info", () => {
    expect(transferOnFinished(group1, group2).length).toBe(3);
    expect(transferOnFinished(group1, group4).length).toBe(3);
    expect(transferOnFinished(group1, group4).length).toBe(3);
    expect(!!transferOnFinished(group6, group1)[0].onFinish).toBe(true);
    expect(!!transferOnFinished(group6, group1)[1].onFinish).toBe(false);
  });
});
