import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { parse, join } from 'path';
import { access, constants } from 'fs/promises';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 */

/**
 * Move file (same as copy but initial file is deleted)
 * @param {string} pathToFile - Path to file.
 * @param {string} pathToNewDirectory - Path to new directory.
 * @return {Promise<Report>} report
 */
export const cp = async (pathToFile, pathToNewDirectory) => {
  const fileName = parse(pathToFile).base;
  const pathToDestination = join(pathToNewDirectory, fileName);

  await Promise.all([
    access(pathToFile, constants.F_OK),
    access(pathToNewDirectory, constants.F_OK),
    access(pathToDestination, constants.F_OK).then(
      () => {
        throw new Error(
          `The ${fileName} file already exists in the path ${pathToNewDirectory}`,
        );
      },
      () => null,
    ),
  ]);

  await pipeline(
    createReadStream(pathToFile),
    createWriteStream(pathToDestination),
  );

  return {
    message: 'Successfully done',
  };
};
