import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

// Mock modules before importing components
jest.mock('@contexts/AuthContext', () => ({
  useAuth: jest.fn(() => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    login: jest.fn(() => Promise.resolve({success: true})),
    signUp: jest.fn(() => Promise.resolve({success: true})),
    logout: jest.fn(() => Promise.resolve()),
    checkAuth: jest.fn(() => Promise.resolve()),
  })),
  AuthProvider: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('@hooks', () => ({
  useFormAnimation: () => ({
    headerAnimatedStyle: {},
    formAnimatedStyle: {},
  }),
}));

jest.mock('@utils/validation', () => ({
  validateForm: (values: Record<string, string>) => {
    const errors: Record<string, string> = {};
    if (!values.email) errors.email = 'emailRequired';
    if (!values.password) errors.password = 'passwordRequired';
    return errors;
  },
  validateField: jest.fn(),
  ValidationSchema: {},
}));

import {LoginScreen} from '../LoginScreen';
import {useAuth} from '@contexts/AuthContext';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('LoginScreen', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
  });

  it('renders correctly', () => {
    const {getAllByText, getByPlaceholderText} = render(
      <LoginScreen navigation={mockNavigation as any} />
    );
    expect(getAllByText('login').length).toBeGreaterThan(0);
    expect(getByPlaceholderText('enterEmail')).toBeTruthy();
    expect(getByPlaceholderText('enterPassword')).toBeTruthy();
  });

  it('allows user to enter email and password', () => {
    const {getByPlaceholderText} = render(
      <LoginScreen navigation={mockNavigation as any} />
    );
    const emailInput = getByPlaceholderText('enterEmail');
    const passwordInput = getByPlaceholderText('enterPassword');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  it('shows validation errors for empty fields', async () => {
    const {getAllByText, getByText} = render(
      <LoginScreen navigation={mockNavigation as any} />
    );
    const loginButtons = getAllByText('login');
    const loginButton = loginButtons[loginButtons.length - 1]; // Get the button (last one)
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByText('emailRequired')).toBeTruthy();
    });
  });

  it('calls login function when form is valid', async () => {
    mockLogin.mockResolvedValue({success: true});
    const {getAllByText, getByPlaceholderText} = render(
      <LoginScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('enterEmail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('enterPassword'), 'password123');
    const loginButtons = getAllByText('login');
    const loginButton = loginButtons[loginButtons.length - 1]; // Get the button (last one)
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('navigates to forgot password screen', () => {
    const {getByText} = render(<LoginScreen navigation={mockNavigation as any} />);
    const forgotPasswordLink = getByText('forgotPassword');
    fireEvent.press(forgotPasswordLink);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ForgotPassword');
  });

  it('navigates to sign up screen', () => {
    const {getByText} = render(<LoginScreen navigation={mockNavigation as any} />);
    const signUpLink = getByText('signUp');
    fireEvent.press(signUpLink);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SignUp');
  });
});

