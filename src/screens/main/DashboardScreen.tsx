import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Card} from '@components/Card';
import {colors, typography, spacing} from '@theme';

export const DashboardScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const MetricCard = ({label, value, unit}: {label: string; value: number; unit: string}) => (
    <Card style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}{unit}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{t('dashboard')}</Text>
        <TouchableOpacity
          onPress={() => {
            const parent = navigation.getParent();
            if (parent) {
              parent.navigate('Settings');
            }
          }}
          style={styles.settingsButton}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        
        <View style={styles.metricsContainer}>
          <MetricCard label={t('temperature')} value={30} unit="°C" />
          <MetricCard label={t('humidity')} value={50} unit="%" />
          <MetricCard label={t('soilMoisture')} value={70} unit="%" />
          <MetricCard label={t('lightIntensity')} value={80} unit="%" />
        </View>

        <Card>
          <Text style={styles.sectionTitle}>{t('waterUsage')}</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>Water Usage Chart</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>{t('upcomingTasks')}</Text>
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{t('waterPlants')}</Text>
            <Text style={styles.taskDate}>Today, 2:00 PM</Text>
          </View>
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{t('checkSoilPh')}</Text>
            <Text style={styles.taskDate}>Tomorrow, 10:00 AM</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>{t('recentActivities')}</Text>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Watered plants - 2 hours ago</Text>
          </View>
          <View style={styles.activityItem}>
            <Text style={styles.activityText}>Soil pH checked - 1 day ago</Text>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.paper,
  },
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.default,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    ...typography.h2,
    color: colors.primary.main,
  },
  settingsButton: {
    padding: spacing.xs,
  },
  settingsIcon: {
    fontSize: 24,
  },
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: spacing.lg,
  },
  metricValue: {
    ...typography.h2,
    color: colors.primary.main,
    marginBottom: spacing.xs,
  },
  metricLabel: {
    ...typography.body2,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  chartPlaceholder: {
    height: 150,
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  taskItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  taskText: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  taskDate: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  activityItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  activityText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
});

