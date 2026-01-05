// eslint.config.js
import js from '@eslint/js';
import * as tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx','postcss.config.js', 'postcss.config.cjs'],
    languageOptions: {
      parser: tseslint.parser,
      globals: {
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'no-prototype-builtins': 'off',
      "react-hooks/exhaustive-deps": "off"
    }
  },
];
