import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, withSpring, Easing} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {Input} from '@components/Input';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';
import {EmojiIcon} from '@components';

type ResetPasswordScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ResetPassword'
>;

interface Props {
  navigation: ResetPasswordScreenNavigationProp;
}

export const ResetPasswordScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!newPassword.trim()) {
      newErrors.newPassword = t('passwordRequired');
    } else if (newPassword.length < 6) {
      newErrors.newPassword = t('passwordMinLength');
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = t('confirmPasswordRequired');
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t('passwordsDoNotMatch');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    if (validate()) {
      navigation.replace('Login');
    }
  };

  const getPasswordStrength = () => {
    if (newPassword.length === 0) return {strength: 0, label: ''};
    if (newPassword.length < 6) return {strength: 1, label: t('weak')};
    if (newPassword.length < 10) return {strength: 2, label: t('medium')};
    return {strength: 3, label: t('strong')};
  };

  const passwordStrength = getPasswordStrength();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Animated.View style={[styles.header, animatedStyle]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <EmojiIcon emoji="←" size={24} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <EmojiIcon emoji="🔑" size={50} />
              </View>
            </View>
            <Text style={styles.title}>{t('resetPassword')}</Text>
            <Text style={styles.subtitle}>{t('createNewPassword')}</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={[styles.form, animatedStyle]}>
            <View>
              <Input
                label={t('newPassword')}
                value={newPassword}
                onChangeText={text => {
                  setNewPassword(text);
                  if (errors.newPassword) {
                    setErrors({...errors, newPassword: ''});
                  }
                }}
                error={errors.newPassword}
                secureTextEntry={!showNewPassword}
                placeholder={t('enterNewPassword')}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.eyeButton}>
                <EmojiIcon emoji={showNewPassword ? '👁️' : '👁️‍🗨️'} size={20} />
              </TouchableOpacity>
            </View>

            {/* Password Strength Indicator */}
            {newPassword.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.strengthBar}>
                  <View
                    style={[
                      styles.strengthFill,
                      {
                        width: `${(passwordStrength.strength / 3) * 100}%`,
                        backgroundColor:
                          passwordStrength.strength === 1
                            ? colors.error.main
                            : passwordStrength.strength === 2
                            ? colors.warning.main
                            : colors.success.main,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.strengthText}>{passwordStrength.label}</Text>
              </View>
            )}

            <View>
              <Input
                label={t('confirmPassword')}
                value={confirmPassword}
                onChangeText={text => {
                  setConfirmPassword(text);
                  if (errors.confirmPassword) {
                    setErrors({...errors, confirmPassword: ''});
                  }
                }}
                error={errors.confirmPassword}
                secureTextEntry={!showConfirmPassword}
                placeholder={t('confirmNewPassword')}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.eyeButton}>
                <EmojiIcon emoji={showConfirmPassword ? '👁️' : '👁️‍🗨️'} size={20} />
              </TouchableOpacity>
            </View>

            <Button
              title={t('resetPassword')}
              onPress={handleReset}
              variant="primary"
              style={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: spacing.sm,
    marginBottom: spacing.md,
  },
  iconContainer: {
    marginBottom: spacing.lg,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary.light + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typography.h1,
    color: colors.primary.main,
    marginBottom: spacing.xs,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  form: {
    marginTop: spacing.lg,
  },
  eyeButton: {
    position: 'absolute',
    right: spacing.md,
    top: 40,
    padding: spacing.xs,
  },
  strengthContainer: {
    marginTop: -spacing.md,
    marginBottom: spacing.md,
  },
  strengthBar: {
    height: 4,
    backgroundColor: colors.border.light,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: spacing.xs,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'right',
  },
  button: {
    marginTop: spacing.md,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    minHeight: 56, // Larger button for easier tapping
  },
});
