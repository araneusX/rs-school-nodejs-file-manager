import os from 'os';

/**
 * @typedef {Object} Report
 * @property {string} [message]
 * @property {string} [payload]
 */

/**
 * Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them) and print it to console
 * @return {Promise<Report>} report
 */
export const cpus = async () => {
  const cpusInfo = os.cpus();

  const info = `    Amount of CPUS >>> ${cpusInfo.length}
  ${cpusInfo
    .map(
      ({ model, speed }, idx) => `
    ${`CPU_${idx}`.padStart(6, ' ')} >>> Model: ${model} | >>> Speed: ${speed / 1000} GHz`,
    )
    .join('')}`;

  return {
    payload: info,
  };
};
