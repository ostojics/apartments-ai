import reactPlugin from 'eslint-plugin-react';
import * as reactHooks from 'eslint-plugin-react-hooks';

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  reactHooks.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
    },
    rules: {
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react-hooks/react-compiler': 'error',
      'max-lines': ['error', {max: 150, skipBlankLines: false, skipComments: false}],
    },
    languageOptions: {
      globals: {
        React: 'writable',
      },
    },
  },
  {
    files: ['**/components/ui/**/*.{ts,tsx,js,jsx}'],
    rules: {
      'max-lines': 'off',
    },
  },
];
