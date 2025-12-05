import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('@hooks', () => ({
  useFormAnimation: () => ({
    headerAnimatedStyle: {},
    formAnimatedStyle: {},
  }),
}));

import {ResetPasswordScreen} from '../ResetPasswordScreen';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  replace: jest.fn(),
};

describe('ResetPasswordScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText, getByPlaceholderText} = render(
      <ResetPasswordScreen navigation={mockNavigation as any} />
    );
    expect(getByText('resetPassword')).toBeTruthy();
    expect(getByPlaceholderText('enterNewPassword')).toBeTruthy();
    expect(getByPlaceholderText('confirmNewPassword')).toBeTruthy();
  });

  it('allows user to enter new password', () => {
    const {getByPlaceholderText} = render(
      <ResetPasswordScreen navigation={mockNavigation as any} />
    );
    const passwordInput = getByPlaceholderText('enterNewPassword');
    fireEvent.changeText(passwordInput, 'newpassword123');
    expect(passwordInput.props.value).toBe('newpassword123');
  });

  it('allows user to confirm password', () => {
    const {getByPlaceholderText} = render(
      <ResetPasswordScreen navigation={mockNavigation as any} />
    );
    const confirmInput = getByPlaceholderText('confirmNewPassword');
    fireEvent.changeText(confirmInput, 'newpassword123');
    expect(confirmInput.props.value).toBe('newpassword123');
  });
});

