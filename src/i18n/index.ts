import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en';
import rw from './locales/rw';
import fr from './locales/fr';

const LANGUAGE_KEY = '@soilsmart:language';

export const getStoredLanguage = async (): Promise<string> => {
  try {
    const language = await AsyncStorage.getItem(LANGUAGE_KEY);
    return language || 'en';
  } catch {
    return 'en';
  }
};

export const setStoredLanguage = async (language: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
      rw: {translation: rw},
      fr: {translation: fr},
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

