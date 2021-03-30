module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
    'import/prefer-default-export': 0,
  },
};
