import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {colors, typography, spacing} from '@theme';
import {setStoredLanguage} from '@i18n';
import i18n from '@i18n';

export const SettingsScreen: React.FC = () => {
  const {t, i18n: i18nInstance} = useTranslation();
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    communityUpdates: true,
    soilAlerts: true,
  });
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [locationServices, setLocationServices] = useState(true);

  const changeLanguage = async (lang: string) => {
    await setStoredLanguage(lang);
    i18nInstance.changeLanguage(lang);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t('deleteAccount'),
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {text: t('cancel'), style: 'cancel'},
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => {
            // Handle account deletion
          },
        },
      ]
    );
  };

  const SettingItem = ({
    title,
    onPress,
    rightComponent,
  }: {
    title: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}>
      <Text style={styles.settingTitle}>{title}</Text>
      {rightComponent}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('settings')}</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('account')}</Text>
          <SettingItem title={t('edit')} onPress={() => {}} />
          <SettingItem
            title={t('changePassword')}
            onPress={() => {}}
          />
          <SettingItem
            title={t('deleteAccount')}
            onPress={handleDeleteAccount}
            rightComponent={
              <Text style={styles.deleteText}>{t('delete')}</Text>
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('notifications')}</Text>
          <SettingItem
            title={t('taskReminders')}
            rightComponent={
              <Switch
                value={notifications.taskReminders}
                onValueChange={value =>
                  setNotifications({...notifications, taskReminders: value})
                }
                trackColor={{
                  false: colors.border.medium,
                  true: colors.primary.light,
                }}
                thumbColor={
                  notifications.taskReminders
                    ? colors.primary.main
                    : colors.text.disabled
                }
              />
            }
          />
          <SettingItem
            title={t('communityUpdates')}
            rightComponent={
              <Switch
                value={notifications.communityUpdates}
                onValueChange={value =>
                  setNotifications({...notifications, communityUpdates: value})
                }
                trackColor={{
                  false: colors.border.medium,
                  true: colors.primary.light,
                }}
                thumbColor={
                  notifications.communityUpdates
                    ? colors.primary.main
                    : colors.text.disabled
                }
              />
            }
          />
          <SettingItem
            title={t('soilAlerts')}
            rightComponent={
              <Switch
                value={notifications.soilAlerts}
                onValueChange={value =>
                  setNotifications({...notifications, soilAlerts: value})
                }
                trackColor={{
                  false: colors.border.medium,
                  true: colors.primary.light,
                }}
                thumbColor={
                  notifications.soilAlerts
                    ? colors.primary.main
                    : colors.text.disabled
                }
              />
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('privacySecurity')}</Text>
          <SettingItem
            title={t('twoFactorAuth')}
            rightComponent={
              <Switch
                value={twoFactorAuth}
                onValueChange={setTwoFactorAuth}
                trackColor={{
                  false: colors.border.medium,
                  true: colors.primary.light,
                }}
                thumbColor={
                  twoFactorAuth ? colors.primary.main : colors.text.disabled
                }
              />
            }
          />
          <SettingItem
            title={t('locationServices')}
            rightComponent={
              <Switch
                value={locationServices}
                onValueChange={setLocationServices}
                trackColor={{
                  false: colors.border.medium,
                  true: colors.primary.light,
                }}
                thumbColor={
                  locationServices
                    ? colors.primary.main
                    : colors.text.disabled
                }
              />
            }
          />
          <SettingItem title={t('blockedUsers')} onPress={() => {}} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('language')}</Text>
          <SettingItem
            title={t('english')}
            onPress={() => changeLanguage('en')}
            rightComponent={
              i18nInstance.language === 'en' && (
                <Text style={styles.selectedText}>✓</Text>
              )
            }
          />
          <SettingItem
            title={t('kinyarwanda')}
            onPress={() => changeLanguage('rw')}
            rightComponent={
              i18nInstance.language === 'rw' && (
                <Text style={styles.selectedText}>✓</Text>
              )
            }
          />
          <SettingItem
            title={t('french')}
            onPress={() => changeLanguage('fr')}
            rightComponent={
              i18nInstance.language === 'fr' && (
                <Text style={styles.selectedText}>✓</Text>
              )
            }
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('helpCenter')}</Text>
          <SettingItem title={t('faq')} onPress={() => {}} />
          <SettingItem title={t('contactSupport')} onPress={() => {}} />
          <SettingItem title={t('reportProblem')} onPress={() => {}} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('about')}</Text>
          <SettingItem
            title={`${t('version')} 1.0.0`}
            rightComponent={null}
          />
          <SettingItem title={t('termsOfService')} onPress={() => {}} />
          <SettingItem title={t('privacyPolicy')} onPress={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.paper,
  },
  header: {
    padding: spacing.md,
    backgroundColor: colors.background.default,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  headerText: {
    ...typography.h2,
    color: colors.primary.main,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background.default,
    borderRadius: 8,
    marginBottom: spacing.xs,
  },
  settingTitle: {
    ...typography.body1,
    color: colors.text.primary,
  },
  deleteText: {
    ...typography.body2,
    color: colors.error.main,
  },
  selectedText: {
    ...typography.body1,
    color: colors.primary.main,
    fontWeight: '600',
  },
});

