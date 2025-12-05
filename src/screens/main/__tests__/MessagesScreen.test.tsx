import React from 'react';
import {render} from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

import {MessagesScreen} from '../MessagesScreen';

describe('MessagesScreen', () => {
  it('renders without crashing', () => {
    const {UNSAFE_root} = render(<MessagesScreen />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('displays chat list', () => {
    const {getByText} = render(<MessagesScreen />);
    expect(getByText('Support Team')).toBeTruthy();
  });

  it('displays message input placeholder', () => {
    const {getByPlaceholderText} = render(<MessagesScreen />);
    expect(getByPlaceholderText('typeMessage')).toBeTruthy();
  });
});

