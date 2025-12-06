import React from 'react';
import {render} from '@testing-library/react-native';

import {DashboardScreen} from '../DashboardScreen';

describe('DashboardScreen', () => {
  it('renders without crashing', () => {
    const {UNSAFE_root} = render(<DashboardScreen />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('displays greeting', () => {
    const {getByText} = render(<DashboardScreen />);
    expect(getByText('goodMorning')).toBeTruthy();
  });

  it('displays temperature metric', () => {
    const {getByText} = render(<DashboardScreen />);
    expect(getByText('temperature')).toBeTruthy();
  });

  it('displays humidity metric', () => {
    const {getByText} = render(<DashboardScreen />);
    expect(getByText('humidity')).toBeTruthy();
  });

  it('displays upcoming tasks section', () => {
    const {getByText} = render(<DashboardScreen />);
    expect(getByText('upcomingTasks')).toBeTruthy();
  });
});

