import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import {colors, spacing} from '@theme';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = colors.primary.main,
  fullScreen = false,
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, {duration: 500, easing: Easing.inOut(Easing.ease)}),
        withTiming(1, {duration: 500, easing: Easing.inOut(Easing.ease)})
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {rotate: `${rotation.value}deg`},
      {scale: scale.value},
    ],
  }));

  if (fullScreen) {
    return (
      <View style={styles.fullScreen}>
        <Animated.View style={animatedStyle}>
          <ActivityIndicator size={size} color={color} />
        </Animated.View>
      </View>
    );
  }

  return (
    <Animated.View style={animatedStyle}>
      <ActivityIndicator size={size} color={color} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.paper,
  },
});

