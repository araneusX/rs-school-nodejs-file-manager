import readline from 'readline';

import {showLoader, printTable, printMessage} from './utils/index.js';

const PROMPT = '> ';

const fileManager = async () => {
  let userName = '';
  let isProcess = false;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: PROMPT,
  });

  const writeStream = process.stdout;

  printMessage.welcome(userName);
  rl.prompt();

rl.on('line', (line) => {
  if (isProcess) {
    writeStream.moveCursor(0 ,-1);
    writeStream.clearScreenDown();
    return;
  }

  switch (line.trim()) {
    case 'hello':
      console.log('world!');
      break;
    case 'loader':
      isProcess = true;
      const stopLoader = showLoader(rl);
      setTimeout(() => {
        stopLoader();
        printMessage.success('Success')
        rl.prompt();
        printMessage.currentDirectory('/')
        rl.prompt();  
        isProcess = false;
      }, 2000);
      break;
    default:
      printMessage.invalidInput();
      break;
  }
  rl.prompt();
}).on('SIGINT', () => {
  rl.setPrompt(PROMPT)
  rl.prompt();
  printMessage.goodbye(userName)
  process.exit(0);
}); 
}

export default fileManager;
