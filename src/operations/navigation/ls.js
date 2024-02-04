/**
 * @typedef {Object} ReportPayload
 * @property {"directory"|"file"} type
 * @property {string} name
 */

/**
 * @typedef {Object} Report
 * @property {"error"|"success"} status
 * @property {string} [message]
 * @property {ReportPayload[]} [payload]
 */

/**
 * Print in console list of all files and folders in current directory.
 * @return {Promise<Report>} report
 */
export const ls = async () => {};
