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

  const tableData = items
    .map((dirent) =>
      ({
        Name: dirent.name,
        Type: (() => {
          try {
            return dirent.isDirectory() ? 'directory' : 'file';
          } catch {
            return 'ERROR';
          }
        })(),
      }),
    )
    .sort((a, b) => {
      let aWeight = a.Type === 'file' ? 10 : 0;
      let bWeight = b.Type === 'file' ? 10 : 0;

      if (a.Name.toLowerCase() < b.Name.toLowerCase()) {
        bWeight += 1;
      } else if (a.Name.toLowerCase() > b.Name.toLowerCase()) {
        aWeight += 1;
      }

      if (aWeight < bWeight) {
        return -1;
      } else if (aWeight > bWeight) {
        return 1;
      } else {
        return 0;
      }
    });

  return {
    payload: tableData,
  };
};
