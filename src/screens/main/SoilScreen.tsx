import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Card} from '@components/Card';
import {colors, typography, spacing} from '@theme';

export const SoilScreen: React.FC = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <View style={styles.header}>
        <Text style={styles.headerText}>{t('soil')}</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Card>
          <Text style={styles.sectionTitle}>pH Level</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartText}>pH Chart - Last 7 days</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>{t('soilReports')}</Text>
          <View style={styles.reportItem}>
            <Text style={styles.reportTitle}>Soil Analysis Report - Jan 2024</Text>
            <Text style={styles.reportDate}>January 15, 2024</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={styles.reportTitle}>Nutrient Level Report</Text>
            <Text style={styles.reportDate}>January 10, 2024</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>{t('recommendations')}</Text>
          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationText}>
              • Add organic compost to improve soil fertility
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationText}>
              • Adjust irrigation schedule based on current moisture levels
            </Text>
          </View>
          <View style={styles.recommendationItem}>
            <Text style={styles.recommendationText}>
              • Consider adding nitrogen-rich fertilizer
            </Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>{t('notifications')}</Text>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>
              Soil moisture is below optimal level
            </Text>
            <Text style={styles.notificationTime}>2 hours ago</Text>
          </View>
          <View style={styles.notificationItem}>
            <Text style={styles.notificationText}>
              pH level needs adjustment
            </Text>
            <Text style={styles.notificationTime}>1 day ago</Text>
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
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartText: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  reportItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  reportTitle: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  reportDate: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  recommendationItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  recommendationText: {
    ...typography.body2,
    color: colors.text.primary,
  },
  notificationItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  notificationText: {
    ...typography.body2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  notificationTime: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});

