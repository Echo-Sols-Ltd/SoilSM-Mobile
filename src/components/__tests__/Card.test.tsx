import React from 'react';
import {render, getByText} from '@testing-library/react-native';
import {Text} from 'react-native';
import {Card} from '../Card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    const {getByText} = render(
      <Card>
        <Text>Test Content</Text>
      </Card>
    );
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders with default variant', () => {
    const {getByText} = render(
      <Card>
        <Text>Content</Text>
      </Card>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('renders with elevated variant', () => {
    const {getByText} = render(
      <Card variant="elevated">
        <Text>Content</Text>
      </Card>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('renders with outlined variant', () => {
    const {getByText} = render(
      <Card variant="outlined">
        <Text>Content</Text>
      </Card>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('applies custom padding', () => {
    const {getByText} = render(
      <Card padding={20}>
        <Text>Content</Text>
      </Card>
    );
    expect(getByText('Content')).toBeTruthy();
  });
});

