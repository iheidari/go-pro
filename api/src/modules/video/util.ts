import * as fs from 'fs';
import { asyncExec } from '../../../util/exec';

export const getServerPath = (fileUri: string) => {
  return process.env.STATIC_PATH + fileUri;
};

export const getDataFileName = (file: string) => {
  return getServerPath(file) + '.json';
};

export function checkFileExists(file: string) {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

export async function stripTelemetry(file: string) {
  try {
    const tempFile = `${file}.tmp.mp4`;
    const command = `ffmpeg -i ${file} -map 0:3 ${tempFile}`;
    await asyncExec(command);
    return tempFile;
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

export const rawGps5Convertor = (samples) => {
  return samples.reduce((acc, sample) => {
    if (
      acc.length === 0 ||
      new Date(sample.date).getSeconds() !==
        new Date(acc[acc.length - 1].date).getSeconds()
    ) {
      acc.push({
        lat: sample.value[0],
        lng: sample.value[1],
        date: sample.date,
        second: acc.length,
      });
    }
    return acc;
  }, []);
};
