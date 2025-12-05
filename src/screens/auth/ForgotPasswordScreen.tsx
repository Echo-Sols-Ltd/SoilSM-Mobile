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
import Animated, {FadeInDown, useSharedValue, useAnimatedStyle, withTiming, withSpring, Easing} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {Input} from '@components/Input';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';
import {EmojiIcon} from '@components';

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
  const [loading, setLoading] = useState(false);

  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);

  useEffect(() => {
    headerOpacity.value = withTiming(1, {duration: 500, easing: Easing.out(Easing.cubic)});
    headerTranslateY.value = withSpring(0, {damping: 12, stiffness: 100});
    formOpacity.value = withTiming(1, {duration: 500, delay: 200});
    formTranslateY.value = withSpring(0, {damping: 12, stiffness: 100, delay: 200});
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{translateY: headerTranslateY.value}],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{translateY: formTranslateY.value}],
  }));

  const handleSend = async () => {
    if (!email.trim()) {
      setError(t('emailRequired'));
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('invalidEmail'));
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Verification');
    }, 1500);
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
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <EmojiIcon emoji="🔐" size={50} />
              </View>
            </View>
            <Text style={styles.title}>{t('forgotPassword')}</Text>
            <Text style={styles.subtitle}>{t('forgotPasswordDescription')}</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={[styles.form, formAnimatedStyle]}>
            <Input
              label={t('email')}
              value={email}
              onChangeText={text => {
                setEmail(text);
                setError('');
              }}
              error={error}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={t('enterEmail')}
            />
            <Button
              title={t('send')}
              onPress={handleSend}
              variant="primary"
              style={styles.button}
              loading={loading}
            />
          </Animated.View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('rememberPassword')} </Text>
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
  button: {
    marginTop: spacing.md,
    borderRadius: 12,
    paddingVertical: spacing.md + 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
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
