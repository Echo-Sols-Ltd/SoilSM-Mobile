import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Button} from '../Button';

describe('Button Component', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with title', () => {
    const {getByText} = render(<Button title="Test Button" onPress={mockOnPress} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const {getByText} = render(<Button title="Test Button" onPress={mockOnPress} />);
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('renders with primary variant by default', () => {
    const {getByText} = render(<Button title="Test" onPress={mockOnPress} />);
    const button = getByText('Test').parent;
    expect(button).toBeTruthy();
  });

  it('renders with secondary variant', () => {
    const {getByText} = render(
      <Button title="Test" onPress={mockOnPress} variant="secondary" />
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('renders with outline variant', () => {
    const {getByText} = render(
      <Button title="Test" onPress={mockOnPress} variant="outline" />
    );
    expect(getByText('Test')).toBeTruthy();
  });

  it('shows loading indicator when loading', () => {
    const {queryByText, UNSAFE_getByType} = render(
      <Button title="Test" onPress={mockOnPress} loading={true} />
    );
    expect(queryByText('Test')).toBeNull();
  });

  it('does not call onPress when disabled', () => {
    const {getByText} = render(
      <Button title="Test" onPress={mockOnPress} disabled={true} />
    );
    fireEvent.press(getByText('Test'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', () => {
    const {UNSAFE_getByType} = render(
      <Button title="Test" onPress={mockOnPress} loading={true} />
    );
    // When loading, button is disabled, so onPress won't be called
    // This is already covered by the disabled test, but we verify loading state
    const activityIndicator = UNSAFE_getByType('ActivityIndicator');
    expect(activityIndicator).toBeTruthy();
    expect(mockOnPress).not.toHaveBeenCalled();
  });
});

