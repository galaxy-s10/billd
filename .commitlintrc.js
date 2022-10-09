const chalk = require('chalk');
const typeEnum = require('./.cz-config');

console.log(
  `${chalk.bgBlueBright.black(' INFO ')} ${chalk.blueBright(
    `读取了: ${__filename.slice(__dirname.length + 1)}`
  )}`
);

module.exports = {
  extends: ['@commitlint/config-conventional'],
  // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
  rules: {
    'type-enum': [2, 'always', typeEnum.types.map((i) => i.value)],
    'scope-empty': [0, 'never'],
  },
};
