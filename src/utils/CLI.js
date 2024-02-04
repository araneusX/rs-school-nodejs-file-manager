import { ReadStream } from 'fs';
import { printMessage } from './printMessage.js';

const symbols = ['⣾', '⣷', '⣯', '⣟', '⡿', '⢿', '⣻', '⣽'];
const writeStream = process.stdout;
const BASE_PROMPT = '> ';
const CTA_PROMPT = 'Enter your command> ';

export class CLI {
  /**
   * @private
   * @readonly
   */
  rl;

  /**
   * @type {number|null}
   */
  interval = null;

  /**
   * @param {readline.Interface} rl
   */
  constructor(rl) {
    this.rl = rl;

    this.rl.setPrompt(BASE_PROMPT);

    this.rl.on('line', () => {
      if (this.interval !== null) {
        writeStream.moveCursor(0, -2);
        writeStream.clearScreenDown();
      } else {
        writeStream.moveCursor(0, -1);
        writeStream.clearScreenDown();
      }
    });
  }

  showCTA() {
    this.rl.setPrompt(BASE_PROMPT);
    this.rl.prompt();
    printMessage.currentDirectory(process.cwd());
    this.rl.setPrompt(CTA_PROMPT);
    this.rl.prompt();
    this.rl.setPrompt(BASE_PROMPT);
  }

  /**
   * @param {string} [username]
   */
  printWelcome(username) {
    printMessage.welcome(username);
    this.showCTA();
  }

  /**
   * @param {string} [username]
   */
  printGoodbye(username) {
    printMessage.welcome(username);
  }

  pauseInput() {
    let currentSymbolIdx = 0;

    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.rl.setPrompt(symbols[currentSymbolIdx] + ' ');

      currentSymbolIdx =
        currentSymbolIdx + 1 < symbols.length ? currentSymbolIdx + 1 : 0;
      this.rl.prompt();
      writeStream.clearScreenDown();
    }, 60);
  }

  resumeInput() {
    clearInterval(this.interval);
    this.interval = null;
    this.showCTA();
  }

  /**
   * @param {{[key: string]: string}[] | string | ReadStream } data - Readline Interface
   * @return {void}
   */
  printData(data) {
    return new Promise((resolve, reject) => {
      const isPause = this.interval !== null;
      clearInterval(this.interval);
      this.interval = null;

      console.log('');
      if (data instanceof ReadStream) {
        data.on('data', (chunk) => {
          printMessage.data(chunk);
        });
        data.on('end', () => {
          console.log('');
          resolve();
        });
        data.on('error', (error) => {
          console.log('');
          reject(error);
        });

        return;
      }

      if (Array.isArray(data)) {
        console.table(data);
      } else {
        printMessage.data(data);
      }
      console.log('');

      if (isPause) {
        this.pauseInput();
      } else {
        this.rl.setPrompt(currentPrompt);
        this.rl.prompt();
      }

      resolve();
    });
  }

  /**
   * @param {string} [message]
   */
  resumeInputWithSuccess(message) {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
      this.rl.setPrompt(BASE_PROMPT);
      this.rl.prompt();
    }

    if (message) {
      this.rl.prompt();
      printMessage.success(message);
    }

    this.showCTA();
  }

  /**
   * @param {string} [message]
   */
  resumeInputWithError(message) {
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
      this.rl.setPrompt(BASE_PROMPT);
    }
    this.rl.prompt();

    const errorMessage = message ?? 'Operation failed';
    printMessage.error(errorMessage);
    this.showCTA();
  }

  get isProcess() {
    return this.interval !== null;
  }
}
