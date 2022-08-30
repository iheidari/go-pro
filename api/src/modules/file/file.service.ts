import { Injectable } from '@nestjs/common';
import { getAllFiles, File } from 'util/file';
import { join } from 'path';

@Injectable()
export class FileService {
  getFiles(path: string): File[] {
    return getAllFiles(
      join(process.env.STATIC_PATH, path),
      '.mp4',
      [],
      process.env.STATIC_PATH,
    );
  }
}
