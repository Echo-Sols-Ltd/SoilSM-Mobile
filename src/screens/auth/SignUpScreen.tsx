import React, {useState} from 'react';
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
  Alert,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {Input} from '@components/Input';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';
import {EmojiIcon} from '@components';
import {useAuth} from '@contexts/AuthContext';
import {useFormAnimation} from '@hooks';
import {validateForm, ValidationSchema} from '@utils/validation';

type SignUpScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'SignUp'
>;

interface Props {
  navigation: SignUpScreenNavigationProp;
}

export const SignUpScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {signUp} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {headerAnimatedStyle, formAnimatedStyle} = useFormAnimation();

  const validationSchema: ValidationSchema = {
    name: {required: true},
    email: {required: true, email: true},
    password: {required: true, minLength: 6},
  };

  const validate = () => {
    const newErrors = validateForm({name, email, password}, validationSchema, t);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const result = await signUp(name, email, password);
      if (result.success) {
        navigation.navigate('Verification');
      } else {
        Alert.alert(t('error'), result.error || t('signUpFailed'));
      }
    } catch (error) {
      Alert.alert(t('error'), t('signUpFailed'));
    } finally {
      setIsLoading(false);
    }
  };

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
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <EmojiIcon emoji="←" size={24} />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <EmojiIcon emoji="🌱" size={60} />
            </View>
            <Text style={styles.title}>{t('signUp')}</Text>
            <Text style={styles.subtitle}>{t('createAccount')}</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={[styles.form, formAnimatedStyle]}>
            <Input
              label={t('name')}
              value={name}
              onChangeText={text => {
                setName(text);
                if (errors.name) setErrors({...errors, name: ''});
              }}
              error={errors.name}
              autoCapitalize="words"
              placeholder={t('enterName')}
            />
            <Input
              label={t('email')}
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (errors.email) setErrors({...errors, email: ''});
              }}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={t('enterEmail')}
            />
            <View>
              <Input
                label={t('password')}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (errors.password) setErrors({...errors, password: ''});
                }}
                error={errors.password}
                secureTextEntry={!showPassword}
                placeholder={t('enterPassword')}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}>
                <EmojiIcon emoji={showPassword ? '👁️' : '👁️‍🗨️'} size={20} />
              </TouchableOpacity>
            </View>
            <Button
              title={t('signUp')}
              onPress={handleSignUp}
              variant="primary"
              style={styles.button}
              loading={isLoading}
              disabled={isLoading}
            />
          </Animated.View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>{t('or')}</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <EmojiIcon emoji="🔵" size={24} />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <EmojiIcon emoji="🔷" size={24} />
              <Text style={styles.socialButtonText}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('alreadyHaveAccount')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>{t('login')}</Text>
            </TouchableOpacity>
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
  logoContainer: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.primary.main,
    marginBottom: spacing.xs,
    fontWeight: '800',
  },
  subtitle: {
    ...typography.body1,
    color: colors.text.secondary,
    textAlign: 'center',
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
  button: {
    marginTop: spacing.md,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    minHeight: 56, // Larger button for easier tapping
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.light,
  },
  dividerText: {
    ...typography.body2,
    color: colors.text.secondary,
    marginHorizontal: spacing.md,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.background.paper,
    borderWidth: 1,
    borderColor: colors.border.light,
    gap: spacing.sm,
  },
  socialButtonText: {
    ...typography.body2,
    color: colors.text.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  footerLink: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: '700',
  },
});

