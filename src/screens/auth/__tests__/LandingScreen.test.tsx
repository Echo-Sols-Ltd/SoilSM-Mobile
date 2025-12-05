import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {LandingScreen} from '../LandingScreen';

const mockNavigation = {
  navigate: jest.fn(),
};

describe('LandingScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(<LandingScreen navigation={mockNavigation as any} />);
    expect(getByText('SoilSmart')).toBeTruthy();
    expect(getByText('welcome')).toBeTruthy();
  });

  it('navigates to sign up screen when sign up button is pressed', () => {
    const {getByText} = render(<LandingScreen navigation={mockNavigation as any} />);
    const signUpButton = getByText('signUp');
    fireEvent.press(signUpButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('SignUp');
  });

  it('navigates to login screen when login button is pressed', () => {
    const {getByText} = render(<LandingScreen navigation={mockNavigation as any} />);
    const loginButton = getByText('login');
    fireEvent.press(loginButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('displays feature highlights', () => {
    const {getByText} = render(<LandingScreen navigation={mockNavigation as any} />);
    expect(getByText('smartMonitoring')).toBeTruthy();
    expect(getByText('community')).toBeTruthy();
    expect(getByText('multiLanguage')).toBeTruthy();
  });
});

