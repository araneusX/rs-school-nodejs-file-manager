const colors = {
  success: '\x1b[92m%s\x1b[0m',
  error: '\x1b[31m%s\x1b[0m',
  currentDirectory: '\x1b[93m%s\x1b[0m',
  welcome: '\x1b[36m%s\x1b[0m',
  goodbye: '\x1b[36m%s\x1b[0m',
  data: '\x1b[35m%s\x1b[0m',
};

const messages = {
  welcome: (value = '') =>
    `Welcome to the File Manager${value && `, ${value}`}!`,
  goodbye: (value = '') =>
    `Thank you for using File Manager${value && `, ${value}`}, goodbye!`,
  success: (value) => value,
  error: (value) =>
    value === 'Invalid input' ? value : `Operation failed: ${value}`,
  data: (value) => value,
  currentDirectory: (value = '') => `You are currently in ${value}`,
};

/**
 * @typedef {Object} PrintMessage
 * @property {(value?: string) => void} welcome
 * @property {(value?: string) => void} goodbye
 * @property {(value?: string) => void} currentDirectory
 * @property {(value: string) => void} success
 * @property {(value: string) => void} error
 * @property {(value: string) => void} data
 */

/**
 * @type {PrintMessage}
 */
export const printMessage = Object.fromEntries(
  Object.entries(messages).map(([name, callback]) => [
    name,
    (...args) => {
      if (colors[name]) {
        console.log(colors[name], callback(...args));
      } else {
        console.log(callback(...args));
      }
    },
  ]),
);
