import React from 'react';
import {render} from '@testing-library/react-native';

import {SoilScreen} from '../SoilScreen';

describe('SoilScreen', () => {
  it('renders without crashing', () => {
    const {UNSAFE_root} = render(<SoilScreen />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('displays soil metrics', () => {
    const {getAllByText} = render(<SoilScreen />);
    // There might be multiple instances of 'phLevel' text
    expect(getAllByText('phLevel').length).toBeGreaterThan(0);
  });

  it('displays soil reports section', () => {
    const {getByText} = render(<SoilScreen />);
    expect(getByText('soilReports')).toBeTruthy();
  });
});

