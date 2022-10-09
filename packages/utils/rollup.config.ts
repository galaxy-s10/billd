import path from 'path';

import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import { defineConfig } from 'rollup';
import dtsPlugin from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';

import pkg from './package.json';

import type { RollupOptions, OutputOptions } from 'rollup';
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild';

const watch = process.argv.includes('--watch');

const external = [...Object.keys(pkg.dependencies || {})].map((name) =>
  RegExp(`^utils($|/)`)
);

// my-name转化为MyName
export const toPascalCase = (input: string): string => {
  input.replace(input[0], input[0].toUpperCase());
  return input.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};

// esbuild替代了rollup-plugin-typescript2、@rollup/plugin-typescript、rollup-plugin-terser
const esbuildPlugin = (options?: ESBuildOptions) =>
  esbuild({
    minify: false,
    // sourceMap: true, // 默认就是true
    ...options,
  });

const configs: RollupOptions[] = [];
const umdConfig: RollupOptions[] = [];
const dtsConfig: RollupOptions[] = [];

const input = path.resolve(__dirname, './src/index.ts');
const output: OutputOptions[] = [];
const plugins = [
  /**
   * @babel/plugin-transform-runtime使用corejs:3（即@babel/runtime-corejs3），
   * 而@babel/runtime-corejs3源码是使用commonjs规范写的，因此需要添加@rollup/plugin-commonjs插件
   * 让rollup支持commonjs 规范，识别 commonjs 规范的依赖。
   */
  commonjs(),
  /**
   * 不使用@rollup/plugin-node-resolve插件的话，import {sum} 'aaa';就不会
   * 把引入的node_modules包里的aaa的sum的代码引进来，而是会原封不动的把
   * import {sum} 'aaa';放到打包的代码里面
   */
  nodeResolve(),
  esbuildPlugin(),
  json(),
];

// WARN 尽量加上dtsPlugin，因为esbuild不会抛出ts类型错误，但是dts插件会抛出ts类型错误
dtsConfig.push({
  input,
  output: {
    file: path.resolve(__dirname, `./dist/index.d.ts`),
    name: toPascalCase(`Billd-utils`),
  },
  plugins: [dtsPlugin()],
});

output.push({
  // sourcemap: true, //开启sourcemap比较耗费性能
  file: path.resolve(__dirname, `./dist/index.mjs`),
  format: 'esm',
});

output.push({
  // sourcemap: true, //开启sourcemap比较耗费性能
  file: path.resolve(__dirname, `./dist/index.cjs`),
  format: 'commonjs',
});

if (!watch) {
  const umdConfigPlugins = [
    ...plugins,
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
      /**
       * 这里设置plugins会覆盖babel.config.js的plugins
       */
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: 3,
            helpers: false,
            regenerator: true,
          },
        ],
      ],
      babelHelpers: 'bundled', // "bundled" | "runtime" | "inline" | "external" | undefined
    }),
  ];
  umdConfig.push({
    input,
    output: {
      // sourcemap: true, //开启sourcemap比较耗费性能
      file: path.resolve(__dirname, `./dist/index.js`),
      format: 'umd',
      name: toPascalCase(`Billd-utils`),
    },
    plugins: [...umdConfigPlugins],
  });
  umdConfig.push({
    input,
    output: {
      // sourcemap: true, //开启sourcemap比较耗费性能
      file: path.resolve(__dirname, `./dist/index.min.js`),
      format: 'umd',
      name: toPascalCase(`Billd-utils`),
    },
    plugins: [...umdConfigPlugins, esbuildPlugin({ minify: true })],
  });
}

configs.push({
  input,
  output,
  external,
  plugins: [
    ...plugins,
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
      extensions: [...DEFAULT_EXTENSIONS, '.ts'],
      /**
       * 这里设置plugins会覆盖babel.config.js的plugins，
       * 因此不设置这里的plugins，让它读取babel.config.js的plugins
       */
      // plugins: [],
      /**
       * babelHelpers和@babel/plugin-transform-runtime的helpers属性相关，
       * 如果babelHelpers设置成runtime，@babel/plugin-transform-runtime的helpers得设置true！
       */
      babelHelpers: 'runtime', // "bundled" | "runtime" | "inline" | "external" | undefined
    }),
  ],
});

export default defineConfig([...configs, ...umdConfig, ...dtsConfig]);
