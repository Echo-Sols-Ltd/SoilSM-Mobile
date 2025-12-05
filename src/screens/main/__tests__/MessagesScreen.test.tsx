import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

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

  it('displays message input placeholder when chat is selected', () => {
    const {getByText, getByPlaceholderText} = render(<MessagesScreen />);
    // Click on a chat to select it
    const chatItem = getByText('Support Team');
    fireEvent.press(chatItem);
    // Now the message input should be visible
    expect(getByPlaceholderText('typeMessage')).toBeTruthy();
  });
});

