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
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';

type VerificationScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Verification'
>;

interface Props {
  navigation: VerificationScreenNavigationProp;
}

export const VerificationScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const [codes, setCodes] = useState(['', '', '', '']);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    const newCodes = [...codes];
    newCodes[index] = text;
    setCodes(newCodes);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (codes.every(code => code !== '')) {
      navigation.navigate('ResetPassword');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{t('verification')}</Text>
        <Text style={styles.subtitle}>{t('enterCode')}</Text>
        <View style={styles.codeContainer}>
          {codes.map((code, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              value={code}
              onChangeText={text => handleCodeChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>
        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>{t('resendCode')}</Text>
        </TouchableOpacity>
        <Button
          title={t('verify')}
          onPress={handleVerify}
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
    alignItems: 'center',
  },
  title: {
    ...typography.h2,
    color: colors.primary.main,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: 8,
    ...typography.h3,
    color: colors.text.primary,
  },
  resendContainer: {
    marginBottom: spacing.lg,
  },
  resendText: {
    ...typography.body2,
    color: colors.primary.main,
  },
  button: {
    width: '100%',
  },
});

