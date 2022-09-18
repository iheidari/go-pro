import { HttpStatus, Injectable } from '@nestjs/common';
import { Cut } from './type';
import * as path from 'path';
import { readFile, unlink } from 'fs/promises';
import * as util from './util';
import * as gpmfExtract from 'gpmf-extract';
import * as goproTelemetry from 'gopro-telemetry';
import * as data from 'src/services/data';
import { TaskService } from '../task/task.service';

@Injectable()
export class VideoService {
  async getCuts(fileUri: string) {
    try {
      const dataFileName = util.getDataFileName(fileUri);
      return data.read(dataFileName, 'cuts') || [];
    } catch (err) {
      throw err;
    }
  }

  async saveCuts(fileUri: string, cuts: Cut[]) {
    try {
      const dataFileName = util.getDataFileName(fileUri);
      await data.write(dataFileName, 'cuts', cuts);
    } catch (err) {
      throw err;
    }
  }

  async applyCuts(fileUri: string, cuts: Cut[], taskService: TaskService) {
    const operationId = taskService.startTask('Apply cuts');
    try {
      const fileName = util.getServerPath(fileUri);
      util
        .cutVideo(fileName, cuts, operationId)
        .then(() => {
          taskService.finishTask(operationId);
        })
        .catch((error) => {
          taskService.errorTask(operationId, error);
        });
    } catch (error) {
      taskService.errorTask(operationId, error);
    }
    return operationId;
  }

  async getTelemetry(fileUri: string) {
    const dataFileName = util.getGpsFileName(fileUri);
    const rawGpsData = await data.read(dataFileName, 'gps');
    if (rawGpsData) {
      const gpsData = util.rawGps5Convertor(rawGpsData);
      return {
        status: HttpStatus.OK,
        message: 'gps data retrived',
        data: gpsData,
      };
    }
    return {
      status: HttpStatus.NO_CONTENT,
      message: 'no gps data retrived',
      data: [],
    };
  }

  async saveTelemetry(fileUri: string) {
    const fileName = util.getServerPath(fileUri);
    const dataFileName = util.getGpsFileName(fileUri);
    console.time('get GPS');
    // check for existing data
    const rawGpsData = await data.read(dataFileName, 'gps');
    if (rawGpsData) {
      const gpsData = util.rawGps5Convertor(rawGpsData);
      console.timeEnd('get GPS');
      return {
        status: HttpStatus.OK,
        message: 'gps data retrived',
        data: gpsData,
      };
    }

    const fileExists = await util.checkFileExists(fileName);
    if (!fileExists) {
      console.warn('File not found');
      return { status: HttpStatus.NOT_FOUND, message: 'file not found' };
    }

    const tempStripedTelemetryFile = await util.stripTelemetry(fileName);
    if (!tempStripedTelemetryFile) {
      console.error('GPS data extraction failed');
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'gps extraction failed',
      };
    }
    try {
      const file = await readFile(tempStripedTelemetryFile);
      const extracted = await gpmfExtract(file);
      const telemetry = await goproTelemetry(extracted, {});
      const gps5 = telemetry['1'].streams.GPS5;
      data.write(dataFileName, 'gps', gps5.samples);
      const videoGpsData = util.rawGps5Convertor(gps5.samples);
      console.timeEnd('get GPS');
      return {
        status: HttpStatus.CREATED,
        message: 'gps data extracted',
        data: videoGpsData,
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

  mergeVideos(
    filesUri: string[],
    outputFileName: string,
    taskService: TaskService,
  ) {
    if (filesUri.length < 2) {
      return -1;
    }
    const operationId = taskService.startTask('Merge Videos');
    try {
      const filesName = filesUri.map((fileUri) => util.getServerPath(fileUri));
      const directory = path.dirname(filesName[0]);
      const outputFile = path.join(directory, outputFileName);
      util
        .mergeVideos(filesName, outputFile, operationId)
        .then(() => {
          // TODO: no hard coding data file path
          // Challenge: we don't have the relative address for data file
          // can't use util.getDataFileName
          return data.write(outputFile + '.json', 'merge', filesName);
        })
        .then(() => {
          taskService.finishTask(operationId);
        })
        .catch((exception) => {
          taskService.errorTask(operationId, exception);
        });
    } catch (exception) {
      taskService.errorTask(operationId, exception);
    }
    return operationId;
  }

  async deleteVideo(fileUri: string, taskService: TaskService) {
    const operationId = taskService.startTask(`Delete ${fileUri}`);
    try {
      const fileName = util.getServerPath(fileUri);
      const fileExists = await util.checkFileExists(fileName);
      if (!fileExists) {
        console.warn('File not found');
        return -1;
        // return { status: HttpStatus.NOT_FOUND, message: 'file not found' };
      }

      unlink(fileName).then(() => {
        taskService.finishTask(operationId);
      });
    } catch (error) {
      taskService.errorTask(operationId, error);
    }

    return operationId;
  }
}
