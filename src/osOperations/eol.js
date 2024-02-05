import os from 'os';

const eolMap = {
  '\r\n': 'Carriage Return + Line Feed (CRLF - "\\r\\n")',
  '\n': 'Line Feed (LF - "\\n")',
  '\r': 'Carriage Return (CR - "\\r")',
};

/**
 * @typedef {Object} Report
 * @property {string} [message]
 * @property {string} [payload]
 */

/**
 * Get EOL (default system End-Of-Line) and print it to console.
 * @return {Promise<Report>} report
 */
export const EOL = async () => {
  return {
    payload: `    Default system End-Of-Line >>> ${eolMap[os.EOL]}`,
  };
};
