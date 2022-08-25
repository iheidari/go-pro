import { Injectable } from '@nestjs/common';
import { getAllFiles, File } from 'util/file';

@Injectable()
export class FileService {
  getFiles(path: string): File[] {
    return getAllFiles(path, '.mp4', [], process.env.STATIC_PATH);
  }
}
