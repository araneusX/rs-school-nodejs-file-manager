import { unlink } from 'fs/promises';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 */

/**
 * Delete file
 * @param {string} fileName - File name.
 * @return {Promise<Report>} report
 */

export const rm = async (fileName) => {
  await unlink(fileName);

  return {
    message: 'Successfully done',
  };
};
