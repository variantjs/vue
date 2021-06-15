module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  collectCoverageFrom: [
    "src/**/*.{vue,ts}",
    "!**/node_modules/**",
    "!**/*.d.ts"
  ],
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
}
