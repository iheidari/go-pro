import * as fs from 'fs';
import * as path from 'path';
import * as ffprobe from 'ffprobe';
import * as ffprobStatic from 'ffprobe-static';
import { asyncExec } from '../../../util/exec';
import { unlink } from 'fs/promises';
import { Cut } from './type';

export const getServerPath = (fileUri: string) => {
  return process.env.STATIC_PATH + fileUri;
};

export const getDataFileName = (file: string) => {
  return getServerPath(file) + '.json';
};
export const getGpsFileName = (file: string) => {
  return getServerPath(file) + '.gps.json';
};

export function checkFileExists(file: string) {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

export async function stripTelemetry(file: string) {
  try {
    const result = await ffprobe(file, { path: ffprobStatic.path });
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
  outputFile: string,
  operationId: number,
) => {
  const directory = path.dirname(fileNames[0]);
  const videoFileListname = path.join(directory, operationId + '.txt');
  createVideoListFile(fileNames, videoFileListname);

  const command = `ffmpeg -f concat -safe 0 -i ${videoFileListname} -map 0:0 -map 0:1 -map 0:2 -map 0:3 -c copy ${outputFile} -ignore_unknown`;
  return asyncExec(command).then(async () => {
    await unlink(videoFileListname);
  });
};

export function cutVideo(fileName: string, cuts: Cut[], operationId: number) {
  const files = [];
  const tasks = cuts.map((cut, index) => {
    const file = fileName + operationId + '_' + index + '.MP4';
    const command = `ffmpeg -ss ${formatSeconds(cut.start)} -to ${formatSeconds(
      cut.end,
    )} -i ${fileName} -map 0:0 -map 0:1 -map 0:3 -c copy ${file} -ignore_unknown`;
    files.push(file);
    return asyncExec(command);
  });
  console.log('cuts done');
  return Promise.all(tasks)
    .then(() => {
      return mergeVideos(files, fileName + '.all.MP4', operationId);
    })
    .then(() => {
      files.forEach((file) => unlink(file));
    });
}

const twoDigits = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();

const formatSeconds = (seconds: number): string => {
  const round = Math.round(seconds);
  return `${twoDigits(Math.floor(round / 60))}:${twoDigits(round % 60)}`;
};
