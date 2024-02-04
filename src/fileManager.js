import readline from 'readline';

import { CLI } from './utils/index.js';

const fileManager = async () => {
  const userName = '';

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const cli = new CLI(rl);

  cli.printWelcome();

  rl.on('line', (line) => {
    if (cli.isProcess) {
      return;
    }

    const [command, ...params] = line
      .trim()
      .split(' ')
      .filter((value) => !!value);

    switch (command) {
      case 'hello':
        console.log('world!');
        break;
      case 'loader': {
        cli.pauseInput();
        setTimeout(() => {
          cli.resumeInputWithSuccess('Eeeeeeeh!');
        }, 5000);
        break;
      }
      default:
        cli.resumeInputWithError('Invalid input');
        break;
    }
    rl.prompt();
  }).on('SIGINT', () => {
    cli.printGoodbye();
    process.exit(0);
  });
};

export default fileManager;
