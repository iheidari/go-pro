import { Injectable } from '@nestjs/common';
import { ITask } from './type';

@Injectable()
export class TaskService {
  runningProcess: ITask[] = [];

  startTask(name: string): ITask {
    const id = new Date().getTime();
    const task: ITask = { id, status: 'started', name };
    this.runningProcess.push(task);
    return task;
  }

  finishTask(taskId: number) {
    console.log('Task finished, OID:' + taskId);
    const index = this.runningProcess.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.runningProcess[index] = {
        ...this.runningProcess[index],
        status: 'finished',
      };
    }
  }

  errorTask(taskId: number, exception: any) {
    console.error(`Exception for mergeVideo, OID: ${taskId}`);
    console.error(exception);
    const index = this.runningProcess.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.runningProcess[index] = {
        ...this.runningProcess[index],
        status: 'error',
      };
    }
  }

  getAllProcess(): ITask[] {
    return this.runningProcess;
  }

  getProcess(id: number): ITask {
    const index = this.runningProcess.findIndex((task) => task.id === id);
    return this.runningProcess[index];
  }
}
