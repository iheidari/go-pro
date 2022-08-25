import * as fs from 'fs';

export const getDataFileName = (file: string) => {
  return process.env.STATIC_PATH + file + '.ini';
};

export function checkFileExists(file: string) {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}
