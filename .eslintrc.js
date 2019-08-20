module.exports = {
  plugins: ['prettier'],
  extends: ['plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  env: {
    es6: true
  }
};
