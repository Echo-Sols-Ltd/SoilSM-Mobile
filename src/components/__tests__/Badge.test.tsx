import React from 'react';
import {render} from '@testing-library/react-native';
import {Badge} from '../Badge';

describe('Badge Component', () => {
  it('renders with label', () => {
    const {getByText} = render(<Badge label="New" />);
    expect(getByText('New')).toBeTruthy();
  });

  it('renders with primary variant by default', () => {
    const {getByText} = render(<Badge label="Test" />);
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const variants = ['primary', 'secondary', 'success', 'error', 'warning'] as const;
    variants.forEach(variant => {
      const {getByText} = render(<Badge label="Test" variant={variant} />);
      expect(getByText('Test')).toBeTruthy();
    });
  });

  it('renders with different sizes', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    sizes.forEach(size => {
      const {getByText} = render(<Badge label="Test" size={size} />);
      expect(getByText('Test')).toBeTruthy();
    });
  });
});

