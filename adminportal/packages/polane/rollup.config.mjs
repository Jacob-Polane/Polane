import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import postCss from 'rollup-plugin-postcss';
import url from '@rollup/plugin-url';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' with { type: "json" };
import eslint from '@rollup/plugin-eslint';

const onwarn = (warning, warn) => {
  if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
  if (warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message);
  warn(warning);
};

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      inlineDynamicImports: true,
    },
  ],
  external: [
    '@ant-design/icons',
    '@shesha-io/reactjs',
    'antd',
    'antd-style',
    'axios',
    'classnames',
    'moment',
    'nanoid',
    'next',
    'react',
    'react-dom',
    'styled-components',
  ],
  plugins: [
    eslint({ throwOnError: true, include: 'src/**/*.ts{,x}' }),
    json(),
    postCss({
      plugins: [],
      minimize: true,
    }),
    peerDepsExternal({
      includeDependencies: true,
    }),
    nodeResolve({
      modulesOnly: true,
    }),
    typescript({ tsconfig: './tsconfig.rollup.json', noEmitOnError: true }),
    commonjs({
      include: 'node_modules/**',
      defaultIsModuleExports: true,
    }),
    url(),
    terser(),
    localResolve(),
    onwarn,
  ],
};
