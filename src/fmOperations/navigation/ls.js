import { readdir } from 'fs/promises';

/**
 * @typedef {Object} ReportPayload
 * @property {"directory"|"file"} type
 * @property {string} name
 */

/**
 * @typedef {Object} Report
 * @property {string} [message]
 * @property {ReportPayload[]} [payload]
 */

/**
 * Print in console list of all files and folders in current directory.
 * @return {Promise<Report>} report
 */
export const ls = async () => {
  const items = await readdir(process.cwd(), { withFileTypes: true });

  const tableData = items.map((dirent) => ({
    Name: dirent.name,
    Type: dirent.isDirectory() ? 'directory' : 'file',
  }));

  return {
    payload: tableData,
  };
};
