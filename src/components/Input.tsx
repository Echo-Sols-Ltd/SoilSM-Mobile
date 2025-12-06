import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import {colors, typography, spacing} from '@theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

/**
 * Text input component with label and error message support
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor={colors.text.disabled}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  input: {
    ...typography.body1,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 12, // More rounded for modern look
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md, // Increased padding for better touch targets
    backgroundColor: colors.background.default,
    color: colors.text.primary,
    minHeight: 56, // Increased for better accessibility
    fontSize: 16, // Ensure readable font size
  },
  inputError: {
    borderColor: colors.error.main,
  },
  errorText: {
    ...typography.caption,
    color: colors.error.main,
    marginTop: spacing.xs,
  },
});

