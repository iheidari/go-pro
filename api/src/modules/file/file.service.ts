import { Injectable } from '@nestjs/common';
import { getAllFiles, File } from 'util/file';
import { STATIC_PATH } from './file.module';

@Injectable()
export class FileService {
  getFiles(path: string): File[] {
    return getAllFiles(path, '.mp4', [], STATIC_PATH);
  }
}
