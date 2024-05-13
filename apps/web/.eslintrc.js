/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['../../packages/config/eslint-base.js', 'plugin:react/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: false,
  },
};
