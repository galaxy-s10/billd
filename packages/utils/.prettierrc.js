const chalk = require('chalk');

console.log(
  `${chalk.bgBlueBright.black(' INFO ')} ${chalk.blueBright(
    `读取了: ${__filename.slice(__dirname.length + 1)}`
  )}`
);

module.exports = {
  bracketSpacing: true, // 默认为true。即要求：{ foo: bar }；可改为false，即要求{foo: bar}
  singleQuote: true, // 默认为false。即要求：const a = "1";；可改为true，即要求const a = '1';
  bracketSameLine: false, // 默认为false。即将多行JSX元素的 > 单独放在下一行；可改为true，即将多行JSX元素的 > 放在最后一行的末尾。
  // jsxBracketSameLine: false, // 此选项已在v2.4.0中弃用，使用bracketSameLine
  trailingComma: 'es5', // 默认"es5"：在ES5中有效的尾随逗号（对象、数组等）。可选："none"：没有尾随逗号；"all"：尽可能尾随逗号
  /**
   * 如果设置了printWidth值，则以设置的printWidth值为准
   * 如果没有设置printWidth值，且.editorconfig文件有设置max_line_length值，则使用.editorconfig文件的max_line_length
   */
  printWidth: 80, // 默认80,printWidth不是硬性的允许行长度上限，不要试图将 printWidth 当作 ESLint 的max-len 来使用——它们不一样
  /**
   * 如果设置了tabWidth值，则以设置的tabWidth值为准
   * 如果没有设置tabWidth值，且.editorconfig文件有设置indent_size或者tab_width值，则使用.editorconfig文件的indent_size或者tab_width
   */
  tabWidth: 2,
  // parser: 'babel',
};
