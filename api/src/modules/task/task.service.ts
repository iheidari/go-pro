import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  runningProcess = [];

  startTask(name: string) {
    const id = new Date().getTime();
    this.runningProcess.push({ id, status: 'started', name });
    return id;
  }

  finishTask(taskId: number) {
    console.log('Task finished, OID:' + taskId);
    const index = this.runningProcess.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.runningProcess[index] = {
        status: 'finished',
        name: this.runningProcess[index].name,
      };
    }
  }

  errorTask(taskId: number, exception: any) {
    console.error(`Exception for mergeVideo, OID: ${taskId}`);
    console.error(exception);
    const index = this.runningProcess.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      this.runningProcess[index] = {
        status: 'error',
        name: this.runningProcess[index].name,
      };
    }
  }

  getAllProcess() {
    return this.runningProcess;
  }

  getProcess(id: number) {
    const index = this.runningProcess.findIndex((task) => task.id === id);
    return this.runningProcess[index];
  }
}
