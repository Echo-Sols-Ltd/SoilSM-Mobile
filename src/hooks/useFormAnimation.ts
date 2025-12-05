import {useEffect} from 'react';
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';

export const useFormAnimation = (delay = 200) => {
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-20);
  const formOpacity = useSharedValue(0);
  const formTranslateY = useSharedValue(20);

  useEffect(() => {
    headerOpacity.value = withTiming(1, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
    headerTranslateY.value = withSpring(0, {damping: 12, stiffness: 100});
    formOpacity.value = withDelay(delay, withTiming(1, {duration: 500}));
    formTranslateY.value = withDelay(
      delay,
      withSpring(0, {damping: 12, stiffness: 100})
    );
  }, [delay]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{translateY: headerTranslateY.value}],
  }));

  const formAnimatedStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{translateY: formTranslateY.value}],
  }));

  return {headerAnimatedStyle, formAnimatedStyle};
};

