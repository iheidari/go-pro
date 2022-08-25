import { Controller, Get, Query, Post, Body } from '@nestjs/common';
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
}
