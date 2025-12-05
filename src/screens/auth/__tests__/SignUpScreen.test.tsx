import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

jest.mock('@contexts/AuthContext');
jest.mock('@hooks');
jest.mock('@utils/validation');

import {SignUpScreen} from '../SignUpScreen';
import {useAuth} from '@contexts/AuthContext';

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
  ValidationSchema: {},
}));

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
    const {getByText, getByPlaceholderText} = render(
      <SignUpScreen navigation={mockNavigation as any} />
    );
    expect(getByText('signUp')).toBeTruthy();
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
    const {getByText} = render(<SignUpScreen navigation={mockNavigation as any} />);
    const signUpButton = getByText('signUp');
    fireEvent.press(signUpButton);

    await waitFor(() => {
      expect(getByText('nameRequired')).toBeTruthy();
    });
  });

  it('calls signUp function when form is valid', async () => {
    mockSignUp.mockResolvedValue({success: true});
    const {getByText, getByPlaceholderText} = render(
      <SignUpScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('enterName'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('enterEmail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('enterPassword'), 'password123');
    fireEvent.press(getByText('signUp'));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith('John Doe', 'test@example.com', 'password123');
    });
  });

  it('navigates to verification screen after successful signup', async () => {
    mockSignUp.mockResolvedValue({success: true});
    const {getByText, getByPlaceholderText} = render(
      <SignUpScreen navigation={mockNavigation as any} />
    );

    fireEvent.changeText(getByPlaceholderText('enterName'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('enterEmail'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('enterPassword'), 'password123');
    fireEvent.press(getByText('signUp'));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith('Verification');
    });
  });
});

