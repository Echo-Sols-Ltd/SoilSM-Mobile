import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock react-native-linear-gradient
jest.mock('react-native-linear-gradient', () => {
  const {View} = require('react-native');
  return {
    __esModule: true,
    default: View,
  };
});

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock i18n
jest.mock('@i18n', () => ({
  __esModule: true,
  default: {
    changeLanguage: jest.fn(),
    language: 'en',
  },
  getStoredLanguage: jest.fn(() => Promise.resolve('en')),
  setStoredLanguage: jest.fn(() => Promise.resolve()),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: jest.fn(),
      language: 'en',
    },
  }),
}));

// Mock theme
jest.mock('@theme', () => ({
  colors: {
    primary: {main: '#4CAF50', light: '#81C784', dark: '#388E3C'},
    secondary: {main: '#FF9800', light: '#FFB74D', dark: '#F57C00'},
    success: {main: '#4CAF50'},
    error: {main: '#F44336'},
    warning: {main: '#FF9800'},
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
      white: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA',
    },
    border: {
      light: '#E0E0E0',
      medium: '#BDBDBD',
    },
    shadow: {
      medium: '#000000',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: {fontSize: 32, fontWeight: '700'},
    h2: {fontSize: 24, fontWeight: '600'},
    h3: {fontSize: 20, fontWeight: '600'},
    body1: {fontSize: 16, fontWeight: '400'},
    body2: {fontSize: 14, fontWeight: '400'},
    caption: {fontSize: 12, fontWeight: '400'},
    button: {fontSize: 16, fontWeight: '600'},
  },
}));

