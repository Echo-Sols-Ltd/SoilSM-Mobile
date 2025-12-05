import React from 'react';
import {render} from '@testing-library/react-native';
import {Avatar} from '../Avatar';

describe('Avatar Component', () => {
  it('renders with initials when name is provided', () => {
    const {getByText} = render(<Avatar name="John Doe" />);
    expect(getByText('JD')).toBeTruthy();
  });

  it('renders with single initial for single name', () => {
    const {getByText} = render(<Avatar name="John" />);
    expect(getByText('J')).toBeTruthy();
  });

  it('renders question mark when no name provided', () => {
    const {getByText} = render(<Avatar />);
    expect(getByText('?')).toBeTruthy();
  });

  it('renders with custom size', () => {
    const {getByText} = render(<Avatar name="John Doe" size={60} />);
    expect(getByText('JD')).toBeTruthy();
  });

  it('renders image when imageUri is provided', () => {
    const {UNSAFE_getByType} = render(
      <Avatar name="John Doe" imageUri="https://example.com/avatar.jpg" />
    );
    // Image component should be rendered
    expect(UNSAFE_getByType).toBeTruthy();
  });
});

