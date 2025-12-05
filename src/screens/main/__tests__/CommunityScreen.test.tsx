import React from 'react';
import {render} from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

import {CommunityScreen} from '../CommunityScreen';

describe('CommunityScreen', () => {
  it('renders without crashing', () => {
    const {UNSAFE_root} = render(<CommunityScreen />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('displays community posts', () => {
    const {getByText} = render(<CommunityScreen />);
    expect(getByText('John Farmer')).toBeTruthy();
  });

  it('displays share button', () => {
    const {getByText} = render(<CommunityScreen />);
    expect(getByText('share')).toBeTruthy();
  });
});

