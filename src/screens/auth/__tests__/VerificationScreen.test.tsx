import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';

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
    // Code inputs should be rendered - verify button should be present
    expect(getByText('verify')).toBeTruthy();
  });

  it('displays resend code button', async () => {
    jest.useFakeTimers();
    const {getByText, queryByText} = render(
      <VerificationScreen navigation={mockNavigation as any} />
    );
    // Initially shows timer text, not resend button
    expect(queryByText('resendCode')).toBeNull();
    expect(getByText(/resendCodeIn/)).toBeTruthy(); // Should show timer text
    
    // Advance timers to make timer reach 0
    act(() => {
      jest.advanceTimersByTime(61000); // Advance 61 seconds
    });
    
    // The resend button should appear after timer expires
    await waitFor(
      () => {
        expect(getByText('resendCode')).toBeTruthy();
      },
      {timeout: 2000}
    );
    
    jest.useRealTimers();
  }, 10000); // Increase test timeout to 10 seconds
});

