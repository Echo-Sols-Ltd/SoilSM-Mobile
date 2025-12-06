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
    if (!values.name) errors.name = 'nameRequired';
    if (!values.email) errors.email = 'emailRequired';
    if (!values.password) errors.password = 'passwordRequired';
    return errors;
  },
  validateField: jest.fn(),
  ValidationSchema: {},
}));

import {SignUpScreen} from '../SignUpScreen';
import {useAuth} from '@contexts/AuthContext';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('SignUpScreen', () => {
  const mockSignUp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      signUp: mockSignUp,
    });
  });

  it('renders correctly', () => {
    const {getAllByText, getByPlaceholderText} = render(
      <SignUpScreen navigation={mockNavigation as any} />
    );
    expect(getAllByText('signUp').length).toBeGreaterThan(0);
    expect(getByPlaceholderText('enterName')).toBeTruthy();
    expect(getByPlaceholderText('enterEmail')).toBeTruthy();
    expect(getByPlaceholderText('enterPassword')).toBeTruthy();
  });

  it('allows user to enter name, email and password', () => {
    const {getByPlaceholderText} = render(
      <SignUpScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('enterName'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('enterEmail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('enterPassword'), 'password123');

    expect(getByPlaceholderText('enterName').props.value).toBe('John Doe');
    expect(getByPlaceholderText('enterEmail').props.value).toBe('test@example.com');
    expect(getByPlaceholderText('enterPassword').props.value).toBe('password123');
  });

  it('shows validation errors for empty fields', async () => {
    const {getAllByText, getByText} = render(<SignUpScreen navigation={mockNavigation as any} />);
    const signUpButtons = getAllByText('signUp');
    const signUpButton = signUpButtons[signUpButtons.length - 1]; // Get the button (last one)
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(getByText('nameRequired')).toBeTruthy();
    });
  });

  it('calls signUp function when form is valid', async () => {
    mockSignUp.mockResolvedValue({success: true});
    const {getAllByText, getByPlaceholderText} = render(
      <SignUpScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('enterName'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('enterEmail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('enterPassword'), 'password123');
    const signUpButtons = getAllByText('signUp');
    const signUpButton = signUpButtons[signUpButtons.length - 1]; // Get the button (last one)
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('John Doe', 'test@example.com', 'password123');
    });
  });

  it('navigates to verification screen after successful signup', async () => {
    mockSignUp.mockResolvedValue({success: true});
    const {getAllByText, getByPlaceholderText} = render(
      <SignUpScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('enterName'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('enterEmail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('enterPassword'), 'password123');
    const signUpButtons = getAllByText('signUp');
    const signUpButton = signUpButtons[signUpButtons.length - 1]; // Get the button (last one)
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Verification');
    });
  });
});

