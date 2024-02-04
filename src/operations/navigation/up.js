/**
 * @typedef {Object} Report
 * @property {"error"|"success"} status
 * @property {string} [message]
 */

/**
 * Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)
 * @return {Promise<Report>} report
 */
export const up = async () => {};
