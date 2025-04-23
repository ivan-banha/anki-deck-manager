import eslint from '@eslint/js';

import eslintPrettier from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: ['**/dist', '**/node_modules', '**/.vscode'],
  },
  {
    plugins: {
      prettier: eslintPrettier,
    },
    rules: {
      ...eslintPrettier.configs.recommended.rules,
    },
  },
  ...tseslint.config(eslint.configs.recommended, tseslint.configs.recommended),
];
