import reactConfig from '@host-elite/linting/react';
import baseConfig from '@host-elite/linting/base';

/** @type {import("eslint").Linter.Config} */
export default [
  {
    ignores: ['dist/**/*', 'public/mockServiceWorker.js'],
  },
  ...baseConfig,
  ...reactConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
  },
];
