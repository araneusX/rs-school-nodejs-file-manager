import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 * @property {string} [payload]
 */

/**
 * Calculate hash for file and print it into console
 * @param {string} pathToFile - Path to file.
 * @return {Report} report
 */
export const hash = async (pathToFile) => {
  const hash = createHash('sha256');

  await pipeline(createReadStream(pathToFile), hash);

  return {
    payload: hash.digest('hex'),
  };
};
