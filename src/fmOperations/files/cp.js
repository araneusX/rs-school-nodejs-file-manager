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

  await Promise.all([
    access(pathToFile, constants.F_OK),
    access(pathToNewDirectory, constants.F_OK),
  ]);

  let pathToDestination;
  let candidateFileName = fileName;

  while (!pathToDestination) {
    const destination = join(pathToNewDirectory, candidateFileName);
    await access(destination, constants.F_OK).then(
      () => {
        candidateFileName = `copy_${candidateFileName}`
      },
      () => {
        pathToDestination = destination;
      },
    )
  }

  await pipeline(
    createReadStream(pathToFile),
    createWriteStream(pathToDestination),
  );

  return {
    message: `Successfully done. The copy file is in "${pathToDestination}"`,
  };
};
