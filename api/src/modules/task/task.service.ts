import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  runningProcess = {};

  startTask(name: string) {
    const newTask = new Date().getTime();
    this.runningProcess[newTask] = { status: 'started', name };
    return newTask;
  }

  finishTask(taskId: number) {
    console.log('Task finished, OID:' + taskId);
    if (this.runningProcess[taskId]) {
      this.runningProcess[taskId] = {
        status: 'finished',
        name: this.runningProcess[taskId].name,
      };
    }
  }

  errorTask(taskId: number, exception: any) {
    console.error(`Exception for mergeVideo, OID: ${taskId}`);
    console.error(exception);
    if (this.runningProcess[taskId]) {
      this.runningProcess[taskId] = {
        status: 'error',
        name: this.runningProcess[taskId].name,
      };
    }
  }
  getAllProcess() {
    return this.runningProcess;
  }
  getProcess(id: string) {
    return this.runningProcess[id];
  }
}
