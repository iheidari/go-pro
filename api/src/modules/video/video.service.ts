import { Injectable } from '@nestjs/common';
import { Cut } from './type';
import { readFile, writeFile } from 'fs/promises';
import { checkFileExists, getDataFileName } from './util';

@Injectable()
export class VideoService {
  async getCuts(file: string) {
    try {
      const dataFileName = getDataFileName(file);
      const fileExists = await checkFileExists(dataFileName);
      if (!fileExists) {
        return;
      }
      const data = await readFile(dataFileName);
      return JSON.parse(data.toString())['Cuts'];
    } catch (err) {
      throw err;
    }
  }
  async saveCuts(file: string, cuts: Cut[]) {
    try {
      const dataFileName = getDataFileName(file);
      const fileExists = await checkFileExists(dataFileName);
      let data = {};
      if (fileExists) {
        const rawData = await readFile(dataFileName);
        data = JSON.parse(rawData.toString());
      }
      const fileData = JSON.stringify({ ...data, Cuts: cuts });
      await writeFile(dataFileName, fileData);
    } catch (err) {
      throw err;
    }
  }
}
