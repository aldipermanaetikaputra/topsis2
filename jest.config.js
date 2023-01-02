export default {
  preset: 'ts-jest/presets/default-esm',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testTimeout: 60000,
  verbose: true,
  automock: false,
  testRegex: './src/.*.test.ts$',
};
