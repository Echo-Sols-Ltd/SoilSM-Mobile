import React from 'react';
import {render} from '@testing-library/react-native';

jest.mock('@contexts/AuthContext');
jest.mock('@i18n', () => ({
  setStoredLanguage: jest.fn(() => Promise.resolve()),
  default: {
    changeLanguage: jest.fn(),
    language: 'en',
  },
}));

import {SettingsScreen} from '../SettingsScreen';
import {useAuth} from '@contexts/AuthContext';

describe('SettingsScreen', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: {id: '1', name: 'Test User', email: 'test@example.com'},
      logout: jest.fn(),
    });
  });

  it('renders correctly', () => {
    const {getByText} = render(<SettingsScreen />);
    expect(getByText('settings')).toBeTruthy();
  });

  it('displays account section', () => {
    const {getByText} = render(<SettingsScreen />);
    expect(getByText('account')).toBeTruthy();
  });

  it('displays notifications section', () => {
    const {getByText} = render(<SettingsScreen />);
    expect(getByText('notifications')).toBeTruthy();
  });

  it('displays language section', () => {
    const {getByText} = render(<SettingsScreen />);
    expect(getByText('language')).toBeTruthy();
  });

  it('displays logout button', () => {
    const {getByText} = render(<SettingsScreen />);
    expect(getByText('logout')).toBeTruthy();
  });
});

