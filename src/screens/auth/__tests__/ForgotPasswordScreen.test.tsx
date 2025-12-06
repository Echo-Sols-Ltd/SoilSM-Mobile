import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

import {ForgotPasswordScreen} from '../ForgotPasswordScreen';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('ForgotPasswordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(
      <ForgotPasswordScreen navigation={mockNavigation as any} />
    );
    expect(getByText('forgotPassword')).toBeTruthy();
    expect(getByPlaceholderText('enterEmail')).toBeTruthy();
  });

  it('allows user to enter email', () => {
    const {getByPlaceholderText} = render(
      <ForgotPasswordScreen navigation={mockNavigation as any} />
    );
    const emailInput = getByPlaceholderText('enterEmail');
    fireEvent.changeText(emailInput, 'test@example.com');
    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('shows send button', () => {
    const {getByText} = render(
      <ForgotPasswordScreen navigation={mockNavigation as any} />
    );
    expect(getByText('send')).toBeTruthy();
  });

  it('navigates to login screen', () => {
    const {getByText} = render(
      <ForgotPasswordScreen navigation={mockNavigation as any} />
    );
    const loginLink = getByText('login');
    fireEvent.press(loginLink);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });
});

