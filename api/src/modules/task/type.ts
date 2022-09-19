export interface ITask {
  id: number;
  status: 'started' | 'finished' | 'error';
  name: string;
}
