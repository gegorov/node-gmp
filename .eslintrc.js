module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  extends: [
    'airbnb-typescript/base',
  ],

  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
    'import/prefer-default-export': 0,
  },
  ignorePatterns: ["/*.*"],
};
