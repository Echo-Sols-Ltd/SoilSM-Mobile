import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './AuthNavigator';
import {MainNavigator} from './MainNavigator';
import {useAuth} from '@contexts/AuthContext';

export const AppNavigator: React.FC = () => {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

