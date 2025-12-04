import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {Input} from '@components/Input';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';

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

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!newPassword.trim()) newErrors.newPassword = 'Password is required';
    if (newPassword.length < 6) newErrors.newPassword = 'Password must be at least 6 characters';
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    if (validate()) {
      navigation.replace('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{t('resetPassword')}</Text>
        <Input
          label={t('newPassword')}
          value={newPassword}
          onChangeText={setNewPassword}
          error={errors.newPassword}
          secureTextEntry
        />
        <Input
          label={t('confirmPassword')}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          secureTextEntry
        />
        <Button
          title={t('resetPassword')}
          onPress={handleReset}
          variant="primary"
          style={styles.button}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.primary.main,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.md,
  },
});

