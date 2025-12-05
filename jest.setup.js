import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  Reanimated.FadeInRight = {
    delay: () => ({duration: () => ({springify: () => ({})})}),
  };
  Reanimated.FadeInLeft = {
    delay: () => ({duration: () => ({springify: () => ({})})}),
  };
  Reanimated.FadeInDown = {
    delay: () => ({duration: () => ({springify: () => ({})})}),
  };
  Reanimated.FadeInUp = {
    delay: () => ({duration: () => ({springify: () => ({})})}),
  };
  Reanimated.FadeIn = {
    delay: () => ({duration: () => ({})}),
  };
  Reanimated.Layout = {
    springify: () => ({}),
  };
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

// Mock navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
  push: jest.fn(),
  pop: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  isFocused: jest.fn(() => true),
  canGoBack: jest.fn(() => true),
  getParent: jest.fn(),
  getState: jest.fn(),
  setOptions: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
};

jest.mock('@react-navigation/stack', () => ({
  StackNavigationProp: jest.fn(),
  createStackNavigator: jest.fn(),
  CardStyleInterpolators: {
    forHorizontalIOS: jest.fn(),
  },
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
  useFocusEffect: jest.fn(),
  useRoute: () => ({
    params: {},
  }),
}));


// Mock theme
jest.mock('@theme', () => ({
  colors: {
    primary: {main: '#4CAF50', light: '#81C784', dark: '#388E3C', gradient: ['#2E7D32', '#4CAF50']},
    secondary: {main: '#FF9800', light: '#FFB74D', dark: '#F57C00'},
    success: {main: '#4CAF50', light: '#81C784', dark: '#388E3C'},
    error: {main: '#F44336', light: '#EF5350', dark: '#C62828'},
    warning: {main: '#FF9800', light: '#FFB74D', dark: '#E65100'},
    info: {main: '#1976D2', light: '#42A5F5', dark: '#1565C0'},
    text: {
      primary: '#212121',
      secondary: '#757575',
      disabled: '#BDBDBD',
      white: '#FFFFFF',
      inverse: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA',
      dark: '#1A1A1A',
      light: '#FAFAFA',
    },
    border: {
      light: '#E0E0E0',
      medium: '#BDBDBD',
      dark: '#9E9E9E',
    },
    shadow: {
      light: 'rgba(0, 0, 0, 0.1)',
      medium: 'rgba(0, 0, 0, 0.15)',
      dark: 'rgba(0, 0, 0, 0.25)',
    },
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
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
    h1: {fontSize: 32, fontWeight: '700', lineHeight: 40},
    h2: {fontSize: 24, fontWeight: '700', lineHeight: 32},
    h3: {fontSize: 20, fontWeight: '600', lineHeight: 28},
    h4: {fontSize: 18, fontWeight: '600', lineHeight: 24},
    body1: {fontSize: 16, fontWeight: '400', lineHeight: 24},
    body2: {fontSize: 14, fontWeight: '400', lineHeight: 20},
    caption: {fontSize: 12, fontWeight: '400', lineHeight: 16},
    button: {fontSize: 16, fontWeight: '600', lineHeight: 24},
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
}));

