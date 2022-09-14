import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/:id')
  getProcess(@Param() params, @Res() res: Response) {
    console.log(`Get:/process/${params.id}`);
    const result = this.taskService.getProcess(params.id);
    if (result) {
      return res.status(HttpStatus.OK).json(result);
    }
    return res.status(HttpStatus.NOT_FOUND).send();
  }
}
