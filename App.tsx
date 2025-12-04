import React, {useEffect} from 'react';
import {StatusBar, View, ActivityIndicator, StyleSheet} from 'react-native';
import {AppNavigator} from '@navigation';
import {AuthProvider, useAuth} from '@contexts/AuthContext';
import {getStoredLanguage} from '@i18n';
import i18n from '@i18n';
import {colors} from '@theme';
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
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
      </View>
    );
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.default,
  },
});

export default App;

