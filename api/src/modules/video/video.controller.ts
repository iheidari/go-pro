import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Res,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { TaskService } from '../task/task.service';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(
    private readonly videoService: VideoService,
    private readonly taskService: TaskService,
  ) {}

  @Get('/cuts')
  getCuts(@Query('file') file) {
    console.log(`Get:video/cuts, file=${file}`);
    return this.videoService.getCuts(file);
  }

  @Post('/cuts')
  saveCuts(@Body('file') file, @Body('cuts') cuts) {
    console.log(`Post:video/cuts, file=${file} cuts=${cuts.length}`);
    return this.videoService.saveCuts(file, cuts);
  }

  @Post('/cuts/apply')
  applyCuts(@Body('file') file, @Body('cuts') cuts) {
    console.log(`Post:video/cuts/apply, file=${file} cuts=${cuts.length}`);
    return this.videoService.applyCuts(file, cuts, this.taskService);
  }

  @Post('/telemetry')
  async saveTelemetry(@Body('file') file, @Res() res: Response) {
    console.log(`Post:video/telemetry, file=${file}`);
    const response = await this.videoService.saveTelemetry(file);
    return res.status(response.status).json(response.data);
  }

  @Get('/telemetry')
  async getTelemetry(@Query('file') file, @Res() res: Response) {
    console.log(`Get:video/telemetry, file=${file}`);
    const response = await this.videoService.getTelemetry(file);
    return res.status(response.status).json(response.data);
  }
  @Post('/merge')
  mergeVideos(
    @Body('files') files,
    @Body('output') outputFileName,
    @Res() res: Response,
  ) {
    console.log(`Post:video/merge, file=${files.length}`);
    const operationId = this.videoService.mergeVideos(
      files,
      outputFileName,
      this.taskService,
    );
    return res.status(HttpStatus.ACCEPTED).json({ operationId });
  }
  @Delete('/delete')
  deleteVideo(@Query('file') file, @Res() res: Response) {
    console.log(`Post:video/delete?file=${file}`);
    const operationId = this.videoService.deleteVideo(file, this.taskService);
    return res.status(HttpStatus.ACCEPTED).json({ operationId });
  }
}
