module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated|@react-navigation|react-native-gesture-handler|react-native-vector-icons|react-native-linear-gradient|react-native-safe-area-context|react-native-screens|react-native-svg)/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components$': '<rootDir>/src/components',
    '^@screens$': '<rootDir>/src/screens',
    '^@navigation$': '<rootDir>/src/navigation',
    '^@utils$': '<rootDir>/src/utils',
    '^@i18n$': '<rootDir>/src/i18n',
    '^@theme$': '<rootDir>/src/theme',
    '^@contexts$': '<rootDir>/src/contexts',
    '^@hooks$': '<rootDir>/src/hooks',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
};

