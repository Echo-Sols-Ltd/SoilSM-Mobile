import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';
import {EmojiIcon} from '@components';

type VerificationScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Verification'
>;

interface Props {
  navigation: VerificationScreenNavigationProp;
}

export const VerificationScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  React.useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleCodeChange = (text: string, index: number) => {
    if (text.length > 1) {
      text = text.slice(-1);
    }
    const newCodes = [...codes];
    newCodes[index] = text.replace(/[^0-9]/g, '');
    setCodes(newCodes);

    if (newCodes[index] && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!newCodes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (codes.every(code => code !== '')) {
      // For sign up flow, go to reset password (which will be skipped in actual implementation)
      // For forgot password flow, go to reset password
      // In a real app, you'd verify the code with the backend first
      navigation.navigate('ResetPassword');
    }
  };

  const handleResend = () => {
    setTimer(60);
    setCodes(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const allFilled = codes.every(code => code !== '');

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
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <EmojiIcon emoji="←" size={24} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <View style={styles.iconCircle}>
                <EmojiIcon emoji="✉️" size={50} />
              </View>
            </View>
            <Text style={styles.title}>{t('verification')}</Text>
            <Text style={styles.subtitle}>{t('enterCode')}</Text>
          </View>

          {/* Code Inputs */}
          <View style={styles.codeContainer}>
            {codes.map((code, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={[
                  styles.codeInput,
                  code && styles.codeInputFilled,
                ]}
                value={code}
                onChangeText={text => handleCodeChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Resend */}
          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>
                {t('resendCodeIn')} {timer}s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendText}>{t('resendCode')}</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Verify Button */}
          <Button
            title={t('verify')}
            onPress={handleVerify}
            variant="primary"
            style={styles.button}
            disabled={!allFilled}
          />
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
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    width: '100%',
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
    marginBottom: spacing.xl,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  codeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
    width: '100%',
    justifyContent: 'center',
  },
  codeInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: colors.border.light,
    borderRadius: 12,
    ...typography.h2,
    color: colors.text.primary,
    backgroundColor: colors.background.default,
  },
  codeInputFilled: {
    borderColor: colors.primary.main,
    backgroundColor: colors.primary.light + '10',
  },
  resendContainer: {
    marginBottom: spacing.xl,
    minHeight: 24,
  },
  timerText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  resendText: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: '700',
  },
  button: {
    width: '100%',
    borderRadius: 12,
    paddingVertical: spacing.lg,
    minHeight: 56, // Larger button for easier tapping
  },
});
