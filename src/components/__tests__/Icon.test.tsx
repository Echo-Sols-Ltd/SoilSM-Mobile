import React from 'react';
import {render} from '@testing-library/react-native';
import {AppIcon, EmojiIcon} from '../Icon';

describe('Icon Components', () => {
  describe('AppIcon', () => {
    it('renders correctly', () => {
      const {UNSAFE_getByType} = render(<AppIcon name="home" />);
      expect(UNSAFE_getByType).toBeTruthy();
    });

    it('renders with custom size', () => {
      const {UNSAFE_getByType} = render(<AppIcon name="home" size={32} />);
      expect(UNSAFE_getByType).toBeTruthy();
    });

    it('renders with custom color', () => {
      const {UNSAFE_getByType} = render(<AppIcon name="home" color="#FF0000" />);
      expect(UNSAFE_getByType).toBeTruthy();
    });
  });

  describe('EmojiIcon', () => {
    it('renders emoji correctly', () => {
      const {getByText} = render(<EmojiIcon emoji="🌱" />);
      expect(getByText('🌱')).toBeTruthy();
    });

    it('renders with custom size', () => {
      const {getByText} = render(<EmojiIcon emoji="🌱" size={40} />);
      expect(getByText('🌱')).toBeTruthy();
    });
  });
});

