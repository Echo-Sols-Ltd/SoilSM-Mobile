import React, {useEffect} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {AppNavigator} from '@navigation';
import {AuthProvider, useAuth} from '@contexts/AuthContext';
import {getStoredLanguage} from '@i18n';
import i18n from '@i18n';
import {LoadingSpinner} from '@components';
import 'react-native-gesture-handler';

const AppContent: React.FC = () => {
  const {isLoading} = useAuth();

  useEffect(() => {
    const initLanguage = async () => {
      const language = await getStoredLanguage();
      i18n.changeLanguage(language);
    };
    initLanguage();
  }, []);

  if (isLoading) {
    return <LoadingSpinner fullScreen size="large" />;
  }

  return <AppNavigator />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle="dark-content" />
      <AppContent />
    </AuthProvider>
  );
};


export default App;

