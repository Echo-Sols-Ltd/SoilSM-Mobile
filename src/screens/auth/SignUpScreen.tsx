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

type SignUpScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignUp'
>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

export const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validate()) {
      navigation.navigate('Verification');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{t('signUp')}</Text>
        <Input
          label={t('name')}
          value={name}
          onChangeText={setName}
          error={errors.name}
          autoCapitalize="words"
        />
        <Input
          label={t('email')}
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label={t('password')}
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
        />
        <Button
          title={t('signUp')}
          onPress={handleSignUp}
          variant="primary"
          style={styles.button}
        />
        <View style={styles.socialContainer}>
          <Text style={styles.socialText}>{t('or')} {t('signUp')} {t('with')}</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>G</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>f</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.linkContainer}>
          <Text style={styles.linkText}>
            {t('alreadyHaveAccount')} {t('login')}
          </Text>
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
  socialContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  socialText: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  socialButtonText: {
    ...typography.h3,
    color: colors.primary.main,
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

