import React from 'react';
import {render} from '@testing-library/react-native';

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
    const {getAllByText} = render(<CommunityScreen />);
    // There might be multiple instances of 'share' text (one per post)
    expect(getAllByText('share').length).toBeGreaterThan(0);
  });
});

