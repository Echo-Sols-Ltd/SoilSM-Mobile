import React from 'react';
import {render} from '@testing-library/react-native';

import {TasksScreen} from '../TasksScreen';

describe('TasksScreen', () => {
  it('renders without crashing', () => {
    const {UNSAFE_root} = render(<TasksScreen />);
    expect(UNSAFE_root).toBeTruthy();
  });

  it('displays tasks', () => {
    const {getByText} = render(<TasksScreen />);
    expect(getByText('waterPlants')).toBeTruthy();
  });

  it('displays add task button', () => {
    const {getByText} = render(<TasksScreen />);
    // The add button shows "+" not "addTask"
    expect(getByText('+')).toBeTruthy();
  });
});

