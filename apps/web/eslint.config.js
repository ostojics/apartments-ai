import reactConfig from '@apartments-ai/linting/react';
import baseConfig from '@apartments-ai/linting/base';

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
