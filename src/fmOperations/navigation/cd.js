import path from 'path';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 */

/**
 * Go to dedicated folder from current directory
 * @param {string} pathToDir - Path to directory can be relative or absolute.
 * @return {Promise<Report>} report
 */

export const cd = async (pathToDir) => {
  if (path.parse(pathToDir).root) {
    process.chdir(pathToDir);
  } else {
    process.chdir(path.join(process.cwd(), pathToDir));
  }

  return {
    message: '',
  };
};
