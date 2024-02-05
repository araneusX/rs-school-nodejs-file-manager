import { createReadStream } from 'fs';
import { access, constants } from 'fs/promises';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 * @property {ReadStream} payload
 */

/**
 * Read file and print it's content in console.
 * @param {string} pathToFile - Path to file.
 * @return {Promise<Report>} report
 */
export const cat = async (pathToFile) => {
  await access(pathToFile, constants.F_OK);

  return {
    payload: createReadStream(pathToFile),
  };
};
