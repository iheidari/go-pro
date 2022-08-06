import * as fs from 'fs';
import * as path from 'path';

export type File = {
  file: string;
  path: string;
  extension?: string;
  name: string;
  birthtime: Date;
  size: number;
};

const getFileInfo = (file: string, extensionFilter: string): File | null => {
  const extension = path.extname(file);
  if (
    extensionFilter &&
    extensionFilter.toLowerCase() !== extension.toLowerCase()
  ) {
    return null;
  }
  const basename = path.basename(file);
  const filePath = path.dirname(file);

  const { birthtimeMs, size } = fs.statSync(file);
  return {
    file: file,
    path: filePath,
    extension,
    name: basename,
    birthtime: new Date(birthtimeMs),
    size,
  };
};

export const getAllFiles = (
  dirPath: string,
  extension: string,
  arrayOfFiles?: File[],
) => {
  const filesAndDirectories = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  filesAndDirectories.forEach((fnd) => {
    if (fs.statSync(dirPath + '/' + fnd).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + fnd, extension, arrayOfFiles);
    } else {
      const file = path.join(dirPath, '/', fnd);
      const result = getFileInfo(file, extension);
      if (result) {
        arrayOfFiles.push(result);
      }
    }
  });

  return arrayOfFiles;
};
