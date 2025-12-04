import React from 'react';
import {View, Text, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {colors, typography, spacing} from '@theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  style,
  textStyle,
}) => {
  const getVariantColor = () => {
    switch (variant) {
      case 'primary':
        return colors.primary.main;
      case 'secondary':
        return colors.secondary.main;
      case 'success':
        return colors.success.main;
      case 'error':
        return colors.error.main;
      case 'warning':
        return colors.warning.main;
      default:
        return colors.primary.main;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {paddingHorizontal: spacing.xs, paddingVertical: 2, fontSize: 10};
      case 'large':
        return {paddingHorizontal: spacing.md, paddingVertical: spacing.xs, fontSize: 14};
      default:
        return {paddingHorizontal: spacing.sm, paddingVertical: 4, fontSize: 12};
    }
  };

  return (
    <View
      style={[
        styles.badge,
        {backgroundColor: getVariantColor()},
        getSizeStyles(),
        style,
      ]}>
      <Text
        style={[
          typography.caption,
          {color: colors.text.white, fontWeight: '600'},
          {fontSize: getSizeStyles().fontSize},
          textStyle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
});

