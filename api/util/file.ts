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

const getFileInfo = (
  file: string,
  dirPath: string,
  extensionFilter: string[],
): File | null => {
  const extension = path.extname(file);
  if (
    extensionFilter.length > 0 &&
    !extensionFilter.find(
      (ext) => ext.toLowerCase() === extension.toLowerCase(),
    )
  ) {
    return null;
  }
  const basename = path.basename(file);
  const filePath = path.dirname(file);

  const { birthtimeMs, size } = fs.statSync(file);
  return {
    file: file.replace(dirPath, ''),
    path: filePath,
    extension,
    name: basename,
    birthtime: new Date(birthtimeMs),
    size,
  };
};

export const getAllFiles = (
  dirPath: string,
  extension: string[],
  originalPath?: string,
  arrayOfFiles?: File[],
) => {
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  const filesAndDirectories = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  filesAndDirectories.forEach((fnd) => {
    if (fs.statSync(path.join(dirPath, fnd)).isDirectory()) {
      arrayOfFiles = getAllFiles(
        path.join(dirPath, fnd),
        extension,
        originalPath || dirPath,
        arrayOfFiles,
      );
    } else {
      const file = path.join(dirPath, fnd);
      const result = getFileInfo(file, originalPath || dirPath, extension);
      if (result) {
        arrayOfFiles.push(result);
      }
    }
  });

  return arrayOfFiles.sort(
    (file1, file2) => file1.birthtime.getTime() - file2.birthtime.getTime(),
  );
};
