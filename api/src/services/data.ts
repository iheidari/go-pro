import { checkFileExists } from 'src/modules/video/util';
import { readFile, writeFile } from 'fs/promises';

export const read = async (file: string, domain?: string) => {
  try {
    const dataFileExists = await checkFileExists(file);
    let dataFile = {} as any;
    if (dataFileExists) {
      const rawData = await readFile(file);
      dataFile = JSON.parse(rawData.toString());
      if (domain && dataFile[domain]) {
        return dataFile[domain];
      }
      if (!domain && dataFile) {
        return dataFile;
      }
    }
  } catch (error) {
    console.error(`Error reading data for file: ${file} domain:${domain}`);
    console.error(error);
  }
};

export const write = async (file: string, domain: string, value: any) => {
  try {
    const dataFile = (await read(file)) || {};
    const fileData = JSON.stringify({ ...dataFile, [domain]: value });
    return writeFile(file, fileData);
  } catch (error) {
    console.error(`Error writing data for file: ${file} domain:${domain}`);
    console.error(error);
  }
};
