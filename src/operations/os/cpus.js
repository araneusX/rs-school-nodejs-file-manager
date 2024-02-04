/**
 * @typedef {Object} Report
 * @property {"error"|"success"} status
 * @property {string} [message]
 * @property {string} [payload]
 */

/**
 * Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
 * @return {Promise<Report>} report
 */
export const cpus = async () => {};
