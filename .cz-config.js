const chalk = require('chalk');

console.log(
  `${chalk.bgBlueBright.black(' INFO ')} ${chalk.blueBright(
    `读取了: ${__filename.slice(__dirname.length + 1)}`
  )}`
);

// https://github.com/leoforfree/cz-customizable
module.exports = {
  types: [
    {
      value: 'build',
      name: '🚀  build:     版本打包/Tag',
    },
    {
      value: 'ci',
      name: '👷  ci:        CI Build',
    },
    {
      value: 'chore',
      name: '📦️  chore:     构建工具调整',
    },
    {
      value: 'docs',
      name: '📝  docs:      文档新增/变更',
    },
    {
      value: 'feat',
      name: '✨  feat:      新功能',
    },
    {
      value: 'fix',
      name: '🐛  fix:       修补bug',
    },
    {
      value: 'perf',
      name: '⚡️  perf:      性能提升',
    },
    {
      value: 'refactor',
      name: '🔨  refactor:  代码重构',
    },
    {
      value: 'revert',
      name: '⏪  revert:    代码回滚',
    },
    {
      value: 'style',
      name: '🎨  style:     样式或UI修改',
    },
    {
      value: 'test',
      name: '🧪  test:      Add missing tests or correcting existing tests',
    },
  ],
  scopes: [],
  skipEmptyScopes: true,
  // allowCustomScopes: true,
};
