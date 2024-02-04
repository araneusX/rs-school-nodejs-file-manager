import os from 'os';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 * @property {string} [payload]
 */

/**
 * Get current system user name (Do not confuse with the username that is set when the application starts) and print it to console
 * @return {Promise<Report>} report
 */
export const username = async () => {
  return {
    payload: `    Current system user name >>> ${os.userInfo().username}`,
  };
};
