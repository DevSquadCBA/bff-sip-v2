export default {
    preset: 'ts-jest',
    injectGlobals: true,
    verbose: true,
    coverageThreshold: {
      global: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 50,
      },
    },
    collectCoverage: true,
    coverageReporters: ['text'],
    collectCoverageFrom: ['./src/**/*.ts', '!**/(config|schemas|interfaces|types|admin)/**/*.ts'],
    setupFiles: ['./tests/jestSetup.ts'],
    modulePaths: ['<rootDir>/src'],
    coverageDirectory: 'coverage',
  };
  