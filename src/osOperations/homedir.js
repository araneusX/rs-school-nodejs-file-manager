import os from 'os';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 * @property {string} [payload]
 */

/**
 * Get home directory and print it to console
 * @return {Promise<Report>} report
 */
export const homedir = async () => {
  return {
    payload: `    Home directory >>> ${os.homedir()}`,
  };
};
