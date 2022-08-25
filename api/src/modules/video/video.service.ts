import { Injectable } from '@nestjs/common';
import { Cut } from './type';
import { readFile, writeFile } from 'fs/promises';
import { checkFileExists, getDataFileName } from './util';

@Injectable()
export class VideoService {
  async getCuts(file: string) {
    try {
      const dataFile = getDataFileName(file);
      const data = await readFile(dataFile);
      return JSON.parse(data.toString())['Cuts'];
    } catch (err) {
      throw err;
    }
  }
  async saveCuts(file: string, cuts: Cut[]) {
    try {
      const dataFile = getDataFileName(file);
      const fileExists = await checkFileExists(dataFile);
      let data = {};
      if (fileExists) {
        const rawData = await readFile(dataFile);
        data = JSON.parse(rawData.toString());
      }
      await writeFile(dataFile, JSON.stringify({ ...data, Cuts: cuts }));
    } catch (err) {
      throw err;
    }
  }
}
