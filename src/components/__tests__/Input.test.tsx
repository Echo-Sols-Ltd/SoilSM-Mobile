import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Input} from '../Input';

describe('Input Component', () => {
  const mockOnChangeText = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByPlaceholderText} = render(
      <Input placeholder="Enter text" onChangeText={mockOnChangeText} />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders with label', () => {
    const {getByText} = render(
      <Input label="Email" placeholder="Enter email" onChangeText={mockOnChangeText} />
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const {getByPlaceholderText} = render(
      <Input placeholder="Enter text" onChangeText={mockOnChangeText} />
    );
    const input = getByPlaceholderText('Enter text');
    fireEvent.changeText(input, 'test');
    expect(mockOnChangeText).toHaveBeenCalledWith('test');
  });

  it('displays error message when error prop is provided', () => {
    const {getByText} = render(
      <Input
        placeholder="Enter text"
        onChangeText={mockOnChangeText}
        error="This field is required"
      />
    );
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = {backgroundColor: 'red'};
    const {getByPlaceholderText} = render(
      <Input
        placeholder="Enter text"
        onChangeText={mockOnChangeText}
        style={customStyle}
      />
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('handles secureTextEntry prop', () => {
    const {getByPlaceholderText} = render(
      <Input
        placeholder="Enter password"
        onChangeText={mockOnChangeText}
        secureTextEntry={true}
      />
    );
    const input = getByPlaceholderText('Enter password');
    expect(input.props.secureTextEntry).toBe(true);
  });
});

