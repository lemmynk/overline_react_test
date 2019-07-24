/* eslint-disable */
require('dotenv').config();

// https://code.lengstorf.com/learn-rollup-js/
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import pkg from './package.json';

export default {
  input: 'src/lib/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      exports: 'named',
    },
  ],
  external: ['dotenv/config'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      module: true,
      preferBuiltins: false,
    }),
    commonjs(),
    json({
      preferConst: true,
      compact: true,
    }),
    process.env.ENVIRONMENT === 'production' && uglify(),
  ],
};
