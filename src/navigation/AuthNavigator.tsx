import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from './types';
import {LandingScreen} from '@screens/auth/LandingScreen';
import {SignUpScreen} from '@screens/auth/SignUpScreen';
import {LoginScreen} from '@screens/auth/LoginScreen';
import {ForgotPasswordScreen} from '@screens/auth/ForgotPasswordScreen';
import {VerificationScreen} from '@screens/auth/VerificationScreen';
import {ResetPasswordScreen} from '@screens/auth/ResetPasswordScreen';
import {MainNavigator} from './MainNavigator';

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({current, layouts}) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          };
        },
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 300,
            },
          },
        },
      }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{
          gestureEnabled: false,
          cardStyleInterpolator: ({current}) => {
            return {
              cardStyle: {
                opacity: current.progress,
              },
            };
          },
        }}
      />
    </Stack.Navigator>
  );
};

