import * as fs from 'fs';
import * as path from 'path';
import * as ffprobe from 'ffprobe';
import { asyncExec } from '../../../util/exec';
import { unlink } from 'fs/promises';

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
    const result = await ffprobe(file, { path: '/opt/homebrew/bin/ffprobe' });
    const stream = result.streams.find(
      (stream) => stream.codec_tag_string === 'gpmd',
    );
    const tempFile = `${file}.tmp.mp4`;
    const command = `ffmpeg -i ${file} -map 0:${stream?.index} ${tempFile}`;
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

export const createVideoListFile = (
  fileNames: string[],
  tempFileName: string,
) => {
  const data = fileNames.map((file) => `file '${file}'`).join('\n');
  fs.writeFileSync(tempFileName, data);
};

export const mergeVideos = (
  fileNames: string[],
  outputFileName: string,
  operationId: number,
) => {
  const directory = path.dirname(fileNames[0]);
  const outputFile = path.join(directory, outputFileName);
  const videoFileListname = path.join(directory, operationId + '.txt');
  createVideoListFile(fileNames, videoFileListname);

  const command = `ffmpeg -f concat -safe 0 -i ${videoFileListname} -map 0:0 -map 0:1 -map 0:2 -map 0:3 -c copy ${outputFile} -ignore_unknown`;
  return asyncExec(command).then(async () => {
    await unlink(videoFileListname);
  });
};
