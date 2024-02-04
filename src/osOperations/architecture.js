import os from 'os';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 * @property {string} [payload]
 */

/**
 * Get CPU architecture for which Node.js binary has compiled and print it to console
 * @return {Promise<Report>} report
 */
export const architecture = async () => {
  return {
    payload: `    CPU architecture for which the Node.js binary was compiled >>> ${os.arch()}`,
  };
};
