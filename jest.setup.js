import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated with better support for FlatList and FlatList items
jest.mock('react-native-reanimated', () => {
  const React = require('react');
  const {View, Text} = require('react-native');
  
  const createAnimatedComponent = (Component: any) => {
    const AnimatedComponent = React.forwardRef((props: any, ref: any) => {
      // Extract entering, exiting, layout props and ignore them for testing
      const {entering, exiting, layout, ...restProps} = props;
      return <Component ref={ref} {...restProps} />;
    });
    AnimatedComponent.displayName = `Animated(${Component.displayName || Component.name || 'Component'})`;
    return AnimatedComponent;
  };

  // Create a mock FlatList that properly renders items
  const createMockFlatList = () => {
    const RN = require('react-native');
    return React.forwardRef((props: any, ref: any) => {
      const {data = [], renderItem, keyExtractor, ListEmptyComponent, ListHeaderComponent, ListFooterComponent, ...restProps} = props;
      
      const children = data.map((item: any, index: number) => {
        const key = keyExtractor ? keyExtractor(item, index) : `item-${index}`;
        const element = renderItem ? renderItem({item, index, separators: {highlight: () => {}, unhighlight: () => {}, updateProps: () => {}}}) : null;
        return element ? React.cloneElement(element, {key}) : null;
      });
      
      return React.createElement(
        RN.ScrollView,
        {ref, ...restProps, testID: props.testID},
        ListHeaderComponent && React.createElement(ListHeaderComponent),
        ...children,
        ListFooterComponent && React.createElement(ListFooterComponent),
        data.length === 0 && ListEmptyComponent && React.createElement(ListEmptyComponent)
      );
    });
  };

  const Reanimated = {
    default: {
      View: createAnimatedComponent(View),
      Text: createAnimatedComponent(Text),
      Image: createAnimatedComponent(require('react-native').Image),
      ScrollView: createAnimatedComponent(require('react-native').ScrollView),
      FlatList: MockFlatList,
      call: () => {},
    },
    View: createAnimatedComponent(View),
    Text: createAnimatedComponent(Text),
    Image: createAnimatedComponent(require('react-native').Image),
    ScrollView: createAnimatedComponent(require('react-native').ScrollView),
    FlatList: MockFlatList,
    createAnimatedComponent,
    useSharedValue: (init: any) => ({value: init}),
    useAnimatedStyle: (fn: any) => ({}),
    withTiming: (value: any) => value,
    withSpring: (value: any) => value,
    withSequence: (...args: any[]) => args[args.length - 1],
    withRepeat: (value: any) => value,
    withDelay: (delay: number, value: any) => value,
    Easing: {
      linear: 'linear',
      ease: 'ease',
      quad: 'quad',
      cubic: 'cubic',
      poly: 'poly',
      sin: 'sin',
      circle: 'circle',
      exp: 'exp',
      elastic: 'elastic',
      back: 'back',
      bounce: 'bounce',
      bezier: 'bezier',
      in: (easing: any) => easing,
      out: (easing: any) => easing,
      inOut: (easing: any) => easing,
    },
    FadeInRight: {
      delay: () => ({
        duration: () => ({
          springify: () => ({}),
        }),
      }),
    },
    FadeInLeft: {
      delay: () => ({
        duration: () => ({
          springify: () => ({}),
        }),
      }),
    },
    FadeInDown: {
      delay: () => ({
        duration: () => ({
          springify: () => ({}),
        }),
      }),
    },
    FadeInUp: {
      delay: () => ({
        duration: () => ({
          springify: () => ({}),
        }),
      }),
    },
    FadeIn: {
      delay: () => ({
        duration: () => ({}),
      }),
    },
    FadeOut: {
      delay: () => ({
        duration: () => ({}),
      }),
    },
    Layout: {
      springify: () => ({}),
    },
    runOnJS: (fn: any) => fn,
    runOnUI: (fn: any) => fn,
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


