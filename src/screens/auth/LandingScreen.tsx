import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';

type LandingScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Landing'
>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

export const LandingScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <View style={styles.placeholderImage} />
        </View>
        <Text style={styles.welcomeText}>{t('welcome')}</Text>
        <View style={styles.buttonContainer}>
          <Button
            title={t('signUp')}
            onPress={() => navigation.navigate('SignUp')}
            variant="primary"
            style={styles.button}
          />
          <Button
            title={t('login')}
            onPress={() => navigation.navigate('Login')}
            variant="outline"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.default,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary.light,
    borderRadius: 12,
    opacity: 0.3,
  },
  welcomeText: {
    ...typography.h2,
    color: colors.primary.main,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    width: '100%',
  },
});

