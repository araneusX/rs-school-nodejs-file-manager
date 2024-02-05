import { writeFile, access, constants } from 'fs/promises';
import { parse } from 'path';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 */

/**
 * Create empty file in current working directory
 * @param {string} newFileName - File name.
 * @return {Report} report
 */
export const add = async (newFileName) => {
  if (parse(newFileName).dir) {
    throw new Error('Wrong filename. Please input only filename without path');
  }

  await access(newFileName, constants.F_OK).then(
    () => {
      throw new Error('The file already exists');
    },
    () => null,
  );

  await writeFile(newFileName, '');

  return {
    message: 'Successfully done',
  };
};
