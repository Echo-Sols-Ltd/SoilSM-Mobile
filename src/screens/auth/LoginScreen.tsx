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
  Alert,
} from 'react-native';
import Animated, {FadeInDown, FadeInUp, useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {Input} from '@components/Input';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';
import {EmojiIcon} from '@components';
import {useAuth} from '@contexts/AuthContext';

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Login'
>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const {login} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);

  useEffect(() => {
    headerOpacity.value = withTiming(1, {duration: 500, easing: Easing.out(Easing.cubic)});
    headerTranslateY.value = withSpring(0, {damping: 12, stiffness: 100});
    formOpacity.value = withDelay(200, withTiming(1, {duration: 500}));
    formTranslateY.value = withDelay(200, withSpring(0, {damping: 12, stiffness: 100}));
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{translateY: headerTranslateY.value}],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{translateY: formTranslateY.value}],
  }));

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!email.trim()) newErrors.email = t('emailRequired');
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = t('invalidEmail');
    if (!password.trim()) newErrors.password = t('passwordRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const result = await login(email, password);
      if (!result.success) {
        Alert.alert(t('error'), result.error || t('loginFailed'));
      }
      // Navigation will happen automatically via auth state change
    } catch (error) {
      Alert.alert(t('error'), t('loginFailed'));
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
            <Text style={styles.title}>{t('login')}</Text>
            <Text style={styles.subtitle}>{t('welcomeBack')}</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={[styles.form, formAnimatedStyle]}>
            <Input
              label={t('email')}
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={t('enterEmail')}
            />
            <View>
              <Input
                label={t('password')}
                value={password}
                onChangeText={setPassword}
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
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotContainer}>
              <Text style={styles.forgotText}>{t('forgotPassword')}</Text>
            </TouchableOpacity>
            <Button
              title={t('login')}
              onPress={handleLogin}
              variant="primary"
              style={styles.button}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

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

          {/* Sign Up Link */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('dontHaveAccount')} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.footerLink}>{t('signUp')}</Text>
            </TouchableOpacity>
          </View>
          </Animated.View>
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
  forgotContainer: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
    marginTop: -spacing.sm,
  },
  forgotText: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: '600',
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

