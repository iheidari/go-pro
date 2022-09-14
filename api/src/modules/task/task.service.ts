import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  runningProcess = {};

  startTask() {
    const newTask = new Date().getTime();
    this.runningProcess[newTask] = 'running';
    return newTask;
  }

  finishTask(taskId: number) {
    console.log('Task finished, OID:' + taskId);
    this.runningProcess[taskId] = 'finished';
  }

  errorTask(taskId: number, exception: any) {
    console.error(`Exception for mergeVideo, OID: ${taskId}`);
    console.error(exception);
    this.runningProcess[taskId] = 'error';
  }

  getProcess(id: string) {
    return this.runningProcess[id];
  }
}
