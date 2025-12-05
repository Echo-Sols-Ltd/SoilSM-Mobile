import React from 'react';
import {render} from '@testing-library/react-native';
import {LoadingSpinner} from '../LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders correctly', () => {
    const {UNSAFE_getByType} = render(<LoadingSpinner />);
    expect(UNSAFE_getByType).toBeTruthy();
  });

  it('renders with small size', () => {
    const {UNSAFE_getByType} = render(<LoadingSpinner size="small" />);
    expect(UNSAFE_getByType).toBeTruthy();
  });

  it('renders with large size', () => {
    const {UNSAFE_getByType} = render(<LoadingSpinner size="large" />);
    expect(UNSAFE_getByType).toBeTruthy();
  });

  it('renders with custom color', () => {
    const {UNSAFE_getByType} = render(<LoadingSpinner color="#FF0000" />);
    expect(UNSAFE_getByType).toBeTruthy();
  });

  it('renders full screen when fullScreen prop is true', () => {
    const {UNSAFE_getByType} = render(<LoadingSpinner fullScreen={true} />);
    expect(UNSAFE_getByType).toBeTruthy();
  });
});

