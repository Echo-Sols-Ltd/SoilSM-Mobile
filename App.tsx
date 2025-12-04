import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {AppNavigator} from '@navigation';
import {getStoredLanguage} from '@i18n';
import i18n from '@i18n';
import 'react-native-gesture-handler';

const App: React.FC = () => {
  useEffect(() => {
    const initLanguage = async () => {
      const language = await getStoredLanguage();
      i18n.changeLanguage(language);
    };
    initLanguage();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </>
  );
};

export default App;

