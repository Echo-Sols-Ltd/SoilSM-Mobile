export const colors = {
  primary: {
    main: '#2E7D32', // Dark green
    light: '#4CAF50', // Light green
    dark: '#1B5E20', // Darker green
    gradient: ['#2E7D32', '#4CAF50'], // Gradient colors
  },
  secondary: {
    main: '#66BB6A',
    light: '#81C784',
    dark: '#388E3C',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    dark: '#1A1A1A',
    light: '#FAFAFA',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    white: '#FFFFFF',
    inverse: '#FFFFFF',
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
  },
  warning: {
    main: '#F57C00',
    light: '#FF9800',
    dark: '#E65100',
  },
  info: {
    main: '#1976D2',
    light: '#42A5F5',
    dark: '#1565C0',
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
};

export type ColorScheme = typeof colors;

