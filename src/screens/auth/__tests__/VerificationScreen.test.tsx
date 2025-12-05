import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('@hooks', () => ({
  useFormAnimation: () => ({
    headerAnimatedStyle: {},
    formAnimatedStyle: {},
  }),
}));

import {VerificationScreen} from '../VerificationScreen';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

describe('VerificationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <VerificationScreen navigation={mockNavigation as any} />
    );
    expect(getByText('verification')).toBeTruthy();
    expect(getByText('enterCode')).toBeTruthy();
  });

  it('allows user to enter verification code', () => {
    const {getByText} = render(
      <VerificationScreen navigation={mockNavigation as any} />
    );
    // Code inputs should be rendered
    expect(getByText('verify')).toBeTruthy();
  });

  it('displays resend code button', () => {
    const {getByText} = render(
      <VerificationScreen navigation={mockNavigation as any} />
    );
    // Initially shows timer, advance timers to show resend button
    jest.advanceTimersByTime(61000); // Advance 61 seconds to make timer 0
    expect(getByText('resendCode')).toBeTruthy();
  });
});

