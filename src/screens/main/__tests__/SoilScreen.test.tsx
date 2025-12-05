import React from 'react';
import {render} from '@testing-library/react-native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

import {SoilScreen} from '../SoilScreen';

describe('SoilScreen', () => {
  it('renders without crashing', () => {
    const {UNSAFE_root} = render(<SoilScreen />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('displays soil metrics', () => {
    const {getByText} = render(<SoilScreen />);
    expect(getByText('phLevel')).toBeTruthy();
  });

  it('displays soil reports section', () => {
    const {getByText} = render(<SoilScreen />);
    expect(getByText('soilReports')).toBeTruthy();
  });
});

