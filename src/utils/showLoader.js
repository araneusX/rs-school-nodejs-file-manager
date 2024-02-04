const symbols = ['⣾', '⣷', '⣯', '⣟', '⡿', '⢿', '⣻', '⣽'];
const writeStream = process.stdout;

/**
 * @param rl - Readline Interface
 * @return {() => void} stopLoader - Callback to stop loader
 */
export const showLoader = (rl) => {
  const currentPrompt = rl.getPrompt();
  let currentSymbolIdx = 0;

  const interval = setInterval(() => {
    rl.setPrompt(symbols[currentSymbolIdx] + ' ');

    currentSymbolIdx =
      currentSymbolIdx + 1 < symbols.length ? currentSymbolIdx + 1 : 0;
    rl.prompt();
    writeStream.clearScreenDown();
  }, 60);

  return () => {
    clearInterval(interval);
    rl.setPrompt(currentPrompt);
    rl.prompt();
  };
};
