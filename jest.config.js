module.exports = {
  testEnvironment: 'jsdom',
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  collectCoverageFrom: [
    "src/**/*.{vue,ts}",
    "!**/node_modules/**",
    "!**/*.d.ts"
  ],
  coverageReporters: ["text", "json", "html"],
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/main.ts",
    "/src/App.vue",
    "/src/development/",
  ]
}
