import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {Input} from '@components/Input';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

export const ForgotPasswordScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    navigation.navigate('Verification');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{t('forgotPassword')}</Text>
        <Input
          label={t('email')}
          value={email}
          onChangeText={setEmail}
          error={error}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button
          title={t('send')}
          onPress={handleSend}
          variant="primary"
          style={styles.button}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.linkContainer}>
          <Text style={styles.linkText}>{t('signUp')}</Text>
        </TouchableOpacity>
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
  linkContainer: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  linkText: {
    ...typography.body2,
    color: colors.primary.main,
  },
});

