import React from 'react';
import {Text, StyleSheet, TextStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@theme';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

export const AppIcon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = colors.text.primary,
  style,
}) => {
  return <Icon name={name} size={size} color={color} style={style} />;
};

// Emoji fallback for icons
export const EmojiIcon: React.FC<{emoji: string; size?: number; style?: TextStyle}> = ({
  emoji,
  size = 24,
  style,
}) => {
  return <Text style={[styles.emoji, {fontSize: size}, style]}>{emoji}</Text>;
};

const styles = StyleSheet.create({
  emoji: {
    textAlign: 'center',
  },
});

