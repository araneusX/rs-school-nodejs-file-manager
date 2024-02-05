import { rename, access, constants } from 'fs/promises';
import { parse, join } from 'path';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 */

/**
 * Rename file (content should remain unchanged)
 * @param {string} pathToFile - Path to file.
 * @param {string} newFileName - New file name.
 * @return {Promise<Report>} report
 */

export const rn = async (pathToFile, newFileName) => {
  await access(newFileName, constants.F_OK).then(
    () => {
      throw new Error(`The file with name ${newFileName} already exists`);
    },
    () => null,
  );

  if (parse(newFileName).dir) {
    throw new Error(
      'Wrong new filename. Please input only filename without path',
    );
  }

  await rename(pathToFile, join(parse(pathToFile).dir, newFileName));

  return {
    message: 'Successfully done',
  };
};
