module.exports = {
  env: {
    node: true,
    jest: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  ignorePatterns: ['.eslintrc.js', 'testes', 'testes_integracao'],
  rules: {
    "@typescript-eslint/consistent-type-imports": "off",
    "@typescript-eslint/no-misused-promises": "off"
  }
}
