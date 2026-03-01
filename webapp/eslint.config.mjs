import { baseConfig } from '../eslint.base.mjs'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  ...baseConfig,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },
  },
  {
    files: ['vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  },
]
