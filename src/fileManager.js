import readline from 'readline';
import path from 'path';
import os from 'os';

import { CLI, resolveParams, doOperation } from './utils/index.js';
import * as fmOperations from './fmOperations/index.js';
import * as osOperations from './osOperations/index.js';

/**
 * @typedef {Object} Result
 * @property {string} [message]
 * @property {Object.<string, string>[] | string} [payload]
 */

const supportedFmOperations = Object.keys(fmOperations);
const supportedOsOperations = Object.keys(osOperations).map(
  (value) => `--${value}`,
);

const fileManager = () => {
  const userName = '';

  process.chdir(os.homedir());

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const cli = new CLI(rl);

  cli.printWelcome();

  rl.on('line', (line) => {
    (async () => {
      if (cli.isProcess) {
        return;
      }

      const [operation, ...operationParams] = line
        .trim()
        .split(' ')
        .filter((value) => value !== '');

      /**
       * @type {Result}
       */
      let result = {};

      if (operation === 'os') {
        const [flag] = resolveParams(operationParams, 1, supportedOsOperations);
        result = await doOperation(osOperations[flag]);
      } else if (supportedFmOperations.includes(operation)) {
        result = await doOperation(fmOperations[operation], operationParams);
      } else {
        throw new Error('Invalid input');
      }

      if (result.payload) {
        cli.printData(result.payload);
      }

      cli.resumeInputWithSuccess(result.message);
    })().catch((error) => {
      cli.resumeInputWithError(
        error instanceof Error ? error.message : undefined,
      );
    });
  }).on('SIGINT', () => {
    cli.printGoodbye();
    process.exit(0);
  });
};

export default fileManager;
