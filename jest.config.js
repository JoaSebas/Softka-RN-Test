module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/*.tsx',
    'src/screens/**/*.tsx',
    'src/api/**/*.ts',
    'src/utils/**/*.ts',
    'src/navigation/**/*.ts',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
