import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['cypress/**/*.ts', 'cypress.config.ts'],
    rules: {
      '@typescript-eslint/no-namespace': 'off',
    },
  },
  {
    ignores: ['node_modules/', 'cypress/reports/', 'cypress/downloads/', 'cypress/screenshots/', 'cypress/videos/'],
  },
);
