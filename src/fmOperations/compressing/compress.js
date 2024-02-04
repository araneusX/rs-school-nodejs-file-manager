import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { access, constants } from 'fs/promises';
import { createBrotliCompress } from 'zlib';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 */

/**
 * Compress file
 * @param {string} pathToFile - Path to file.
 * @param {string} pathToDestination - Path to compressed file.
 * @return {Promise<Report>} report
 */

export const compress = async (pathToFile, pathToDestination) => {
  await Promise.all([
    access(pathToFile, constants.F_OK),
    access(pathToDestination, constants.F_OK).then(
      () => {
        throw new Error('The destination file already exists');
      },
      () => null,
    ),
  ]);

  await pipeline(
    createReadStream(pathToFile),
    createBrotliCompress(),
    createWriteStream(pathToDestination),
  );

  return {
    message: 'Successfully done',
  };
};
