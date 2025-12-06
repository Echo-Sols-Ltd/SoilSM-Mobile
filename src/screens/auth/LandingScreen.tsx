import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button';
import {colors, typography, spacing} from '@theme';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';
import {EmojiIcon} from '@components';
import {Images} from '../../constants/images';

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
  
  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);
  const imageOpacity = useSharedValue(0);
  const imageTranslateY = useSharedValue(30);
  const featuresOpacity = useSharedValue(0);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(20);

  useEffect(() => {
    // Logo animation
    logoOpacity.value = withTiming(1, {duration: 600, easing: Easing.out(Easing.cubic)});
    logoScale.value = withSpring(1, {damping: 10, stiffness: 100});
    
    // Image animation
    imageOpacity.value = withDelay(200, withTiming(1, {duration: 600}));
    imageTranslateY.value = withDelay(200, withSpring(0, {damping: 12, stiffness: 100}));
    
    // Features animation
    featuresOpacity.value = withDelay(400, withTiming(1, {duration: 500}));
    
    // Buttons animation
    buttonsOpacity.value = withDelay(600, withTiming(1, {duration: 500}));
    buttonsTranslateY.value = withDelay(600, withSpring(0, {damping: 12, stiffness: 100}));
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{scale: logoScale.value}],
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
    transform: [{translateY: imageTranslateY.value}],
  }));

  const featuresAnimatedStyle = useAnimatedStyle(() => ({
    opacity: featuresOpacity.value,
  }));

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{translateY: buttonsTranslateY.value}],
  }));

  return (
    <LinearGradient
      colors={[colors.primary.light, colors.primary.main]}
      style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Logo/Icon Section */}
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <View style={styles.iconCircle}>
              <EmojiIcon emoji="🌱" size={80} />
            </View>
            <Text style={styles.appName}>SoilSmart</Text>
            <Text style={styles.tagline}>{t('welcome')}</Text>
          </Animated.View>

          {/* Illustration Section */}
          <Animated.View style={[styles.illustrationContainer, imageAnimatedStyle]}>
            <ImageBackground
              source={Images.agricultureVietnam}
              style={styles.heroImage}
              imageStyle={styles.heroImageStyle}
              resizeMode="cover">
              <View style={styles.imageOverlay} />
            </ImageBackground>
          </Animated.View>

          {/* Features */}
          <Animated.View style={[styles.featuresContainer, featuresAnimatedStyle]}>
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
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View style={[styles.buttonContainer, buttonsAnimatedStyle]}>
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
          </Animated.View>
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
    marginVertical: spacing.xl,
  },
  heroImage: {
    width: width * 0.9,
    height: height * 0.38,
    borderRadius: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  heroImageStyle: {
    borderRadius: 24,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(46, 125, 50, 0.25)',
    borderRadius: 24,
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

