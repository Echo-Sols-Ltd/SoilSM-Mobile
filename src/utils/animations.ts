import {withTiming, withSpring, Easing} from 'react-native-reanimated';

export const AnimationConfig = {
  // Timing animations
  fast: {
    duration: 200,
    easing: Easing.out(Easing.cubic),
  },
  normal: {
    duration: 300,
    easing: Easing.out(Easing.cubic),
  },
  slow: {
    duration: 500,
    easing: Easing.out(Easing.cubic),
  },
  
  // Spring animations
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  
  // Fade animations
  fadeIn: (duration = 300) => 
    withTiming(1, {
      duration,
      easing: Easing.out(Easing.cubic),
    }),
  
  fadeOut: (duration = 300) => 
    withTiming(0, {
      duration,
      easing: Easing.in(Easing.cubic),
    }),
  
  // Slide animations
  slideIn: (duration = 300) => 
    withTiming(0, {
      duration,
      easing: Easing.out(Easing.cubic),
    }),
  
  slideOut: (duration = 300) => 
    withTiming(100, {
      duration,
      easing: Easing.in(Easing.cubic),
    }),
  
  // Scale animations
  scaleIn: (duration = 300) => 
    withSpring(1, {
      damping: 15,
      stiffness: 150,
    }),
  
  scaleOut: (duration = 300) => 
    withTiming(0.95, {
      duration,
      easing: Easing.out(Easing.cubic),
    }),
  
  // Bounce animations
  bounce: () => 
    withSpring(1, {
      damping: 8,
      stiffness: 200,
    }),
};

