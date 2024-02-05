import path from 'path';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 */

/**
 * Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)
 * @return {Promise<Report>} report
 */
export const up = async () => {
  if (process.cwd() === path.parse(process.cwd()).root) {
    throw new Error('You are in the root directory');
  }

  process.chdir(path.join(process.cwd(), '..'));

  return {
    message: '',
  };
};
