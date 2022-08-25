import { Controller, Get, Query } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  getFiles(@Query('path') path) {
    console.log(`GET:file, path=${path}`);
    return this.fileService.getFiles(path);
  }
}
