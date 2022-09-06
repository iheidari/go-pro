import { Controller, Get, Query, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

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

  @Post('/telemetry')
  async saveTelemetry(@Body('file') file, @Res() res: Response) {
    console.log(`Post:video/telemetry, file=${file}`);
    const response = await this.videoService.saveTelemetry(file);
    return res.status(response.status).json(response);
  }
}
