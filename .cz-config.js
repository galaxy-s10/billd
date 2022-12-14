const chalk = require('chalk');

console.log(
  `${chalk.bgBlueBright.black(' INFO ')} ${chalk.blueBright(
    `è¯»åäº: ${__filename.slice(__dirname.length + 1)}`
  )}`
);

// https://github.com/leoforfree/cz-customizable
module.exports = {
  types: [
    {
      value: 'build',
      name: 'ð  build:     çæ¬æå/Tag',
    },
    {
      value: 'ci',
      name: 'ð·  ci:        CI Build',
    },
    {
      value: 'chore',
      name: 'ð¦ï¸  chore:     æå»ºå·¥å·è°æ´',
    },
    {
      value: 'docs',
      name: 'ð  docs:      ææ¡£æ°å¢/åæ´',
    },
    {
      value: 'feat',
      name: 'â¨  feat:      æ°åè½',
    },
    {
      value: 'fix',
      name: 'ð  fix:       ä¿®è¡¥bug',
    },
    {
      value: 'perf',
      name: 'â¡ï¸  perf:      æ§è½æå',
    },
    {
      value: 'refactor',
      name: 'ð¨  refactor:  ä»£ç éæ',
    },
    {
      value: 'revert',
      name: 'âª  revert:    ä»£ç åæ»',
    },
    {
      value: 'style',
      name: 'ð¨  style:     æ ·å¼æUIä¿®æ¹',
    },
    {
      value: 'test',
      name: 'ð§ª  test:      Add missing tests or correcting existing tests',
    },
  ],
  scopes: [],
  skipEmptyScopes: true,
  // allowCustomScopes: true,
};
