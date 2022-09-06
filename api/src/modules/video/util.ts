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
