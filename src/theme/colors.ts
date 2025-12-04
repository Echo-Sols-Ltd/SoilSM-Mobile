export const colors = {
  primary: {
    main: '#2E7D32', // Dark green
    light: '#4CAF50', // Light green
    dark: '#1B5E20', // Darker green
  },
  secondary: {
    main: '#66BB6A',
    light: '#81C784',
  },
  background: {
    default: '#FFFFFF',
    paper: '#F5F5F5',
    dark: '#1A1A1A',
  },
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
    white: '#FFFFFF',
  },
  error: {
    main: '#D32F2F',
    light: '#EF5350',
  },
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
  },
  border: {
    light: '#E0E0E0',
    medium: '#BDBDBD',
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

