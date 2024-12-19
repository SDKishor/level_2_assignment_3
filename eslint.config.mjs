import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      'no-unused-vars': 'error',
      'prefer-const': 'error',
      'no-unused-expressions': 'error',
      'no-undef': 'warn',
      'no-console': 'warn',
    },
  },
  { ignores: ['.node_modules/*'] },
  eslintPluginPrettierRecommended,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
