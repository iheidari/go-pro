import { HttpStatus, Injectable } from '@nestjs/common';
import { Cut } from './type';
import { readFile, writeFile, unlink } from 'fs/promises';
import {
  checkFileExists,
  getDataFileName,
  getServerPath,
  stripTelemetry,
} from './util';
import * as gpmfExtract from 'gpmf-extract';
import * as goproTelemetry from 'gopro-telemetry';

@Injectable()
export class VideoService {
  async getCuts(fileUri: string) {
    try {
      const dataFileName = getDataFileName(fileUri);
      const fileExists = await checkFileExists(dataFileName);
      if (!fileExists) {
        return;
      }
      const data = await readFile(dataFileName);
      return JSON.parse(data.toString())['cuts'];
    } catch (err) {
      throw err;
    }
  }

  async saveCuts(fileUri: string, cuts: Cut[]) {
    try {
      const dataFileName = getDataFileName(fileUri);
      let data = {};
      const fileExists = await checkFileExists(dataFileName);
      if (fileExists) {
        const rawData = await readFile(dataFileName);
        data = JSON.parse(rawData.toString());
      }
      const fileData = JSON.stringify({ ...data, cuts: cuts });
      await writeFile(dataFileName, fileData);
    } catch (err) {
      throw err;
    }
  }

  async saveTelemetry(fileUri: string) {
    const fileName = getServerPath(fileUri);
    const fileExists = await checkFileExists(fileName);
    if (!fileExists) {
      console.warn('File not found');
      return { status: HttpStatus.NOT_FOUND, message: 'file not found' };
    }
    const tempStripedTelemetryFile = await stripTelemetry(fileName);
    try {
      const dataFileName = getDataFileName(fileUri);
      const dataFileExists = await checkFileExists(dataFileName);
      let dataFile = {};
      if (dataFileExists) {
        const rawData = await readFile(dataFileName);
        dataFile = JSON.parse(rawData.toString());
      }
      const file = await readFile(tempStripedTelemetryFile);
      const extracted = await gpmfExtract(file);
      const telemetry = await goproTelemetry(extracted, {});
      const gps5 = telemetry['1'].streams.GPS5;
      const fileData = JSON.stringify({ ...dataFile, gps5 });
      await writeFile(dataFileName, fileData);
      const data = gps5.samples.reduce((acc, sample) => {
        if (
          acc.length === 0 ||
          new Date(sample.date).getSeconds() !=
            new Date(acc[acc.length - 1].date).getSeconds()
        ) {
          acc.push({
            lat: sample.value[0],
            lng: sample.value[1],
            second: acc.length,
          });
        }
        return acc;
      }, []);
      return {
        status: HttpStatus.CREATED,
        message: 'gps data extracted',
        data: data,
      };
    } catch (error) {
      console.error(error);
    } finally {
      unlink(tempStripedTelemetryFile);
    }
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'server error',
    };
  }
}
