import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';
import {EmojiIcon} from '@components';

const {width, height} = Dimensions.get('window');

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
    <LinearGradient
      colors={[colors.primary.light, colors.primary.main]}
      style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo/Icon Section */}
          <View style={styles.logoContainer}>
            <View style={styles.iconCircle}>
              <EmojiIcon emoji="🌱" size={80} />
            </View>
            <Text style={styles.appName}>SoilSmart</Text>
            <Text style={styles.tagline}>{t('welcome')}</Text>
          </View>

          {/* Illustration Section */}
          <View style={styles.illustrationContainer}>
            <View style={styles.illustration}>
              <EmojiIcon emoji="🌾" size={120} />
              <View style={styles.floatingIcon1}>
                <EmojiIcon emoji="💧" size={40} />
              </View>
              <View style={styles.floatingIcon2}>
                <EmojiIcon emoji="☀️" size={40} />
              </View>
              <View style={styles.floatingIcon3}>
                <EmojiIcon emoji="🌿" size={40} />
              </View>
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <EmojiIcon emoji="📊" size={32} />
              <Text style={styles.featureText}>{t('smartMonitoring')}</Text>
            </View>
            <View style={styles.feature}>
              <EmojiIcon emoji="👥" size={32} />
              <Text style={styles.featureText}>{t('community')}</Text>
            </View>
            <View style={styles.feature}>
              <EmojiIcon emoji="🌍" size={32} />
              <Text style={styles.featureText}>{t('multiLanguage')}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              title={t('signUp')}
              onPress={() => navigation.navigate('SignUp')}
              variant="primary"
              style={styles.primaryButton}
              textStyle={styles.primaryButtonText}
            />
            <Button
              title={t('login')}
              onPress={() => navigation.navigate('Login')}
              variant="outline"
              style={styles.outlineButton}
              textStyle={styles.outlineButtonText}
            />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  appName: {
    ...typography.h1,
    color: colors.text.white,
    marginBottom: spacing.sm,
    fontWeight: '800',
  },
  tagline: {
    ...typography.h4,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: spacing.xl,
  },
  illustration: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  floatingIcon1: {
    position: 'absolute',
    top: 20,
    right: 10,
  },
  floatingIcon2: {
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
  floatingIcon3: {
    position: 'absolute',
    top: 50,
    left: -20,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: spacing.lg,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    ...typography.caption,
    color: colors.text.white,
    marginTop: spacing.xs,
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  primaryButton: {
    backgroundColor: colors.text.white,
    borderRadius: 12,
    paddingVertical: spacing.md + 4,
  },
  primaryButtonText: {
    color: colors.primary.main,
    fontWeight: '700',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.text.white,
    borderRadius: 12,
    paddingVertical: spacing.md + 4,
  },
  outlineButtonText: {
    color: colors.text.white,
    fontWeight: '700',
  },
});

