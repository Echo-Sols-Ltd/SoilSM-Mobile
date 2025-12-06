import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {FadeInDown, FadeInRight, withSpring, useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {LinearGradient} from 'expo-linear-gradient';
import {useTranslation} from 'react-i18next';
import {Card} from '@components/Card';
import {Badge, EmojiIcon} from '@components';
import {colors, typography, spacing} from '@theme';
import {format} from 'date-fns';

const {width} = Dimensions.get('window');

interface SoilMetric {
  label: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  icon: string;
}

export const SoilScreen: React.FC = () => {
  const {t} = useTranslation();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  const soilMetrics: SoilMetric[] = [
    {
      label: t('phLevel'),
      value: 6.8,
      unit: '',
      status: 'good',
      icon: '🧪',
    },
    {
      label: t('nitrogen'),
      value: 45,
      unit: '%',
      status: 'good',
      icon: '🌿',
    },
    {
      label: t('phosphorus'),
      value: 32,
      unit: '%',
      status: 'warning',
      icon: '💧',
    },
    {
      label: t('potassium'),
      value: 28,
      unit: '%',
      status: 'critical',
      icon: '⚡',
    },
  ];

  const phData = [6.5, 6.7, 6.6, 6.8, 6.9, 6.8, 6.8];

  const reports = [
    {
      id: '1',
      title: t('soilAnalysisReport'),
      date: 'January 15, 2024',
      type: 'analysis',
    },
    {
      id: '2',
      title: t('nutrientLevelReport'),
      date: 'January 10, 2024',
      type: 'nutrient',
    },
    {
      id: '3',
      title: t('moistureAnalysis'),
      date: 'January 5, 2024',
      type: 'moisture',
    },
  ];

  const recommendations = [
    {
      id: '1',
      text: t('addOrganicCompost'),
      priority: 'high' as const,
      icon: '🌱',
    },
    {
      id: '2',
      text: t('adjustIrrigationSchedule'),
      priority: 'medium' as const,
      icon: '💧',
    },
    {
      id: '3',
      text: t('addNitrogenFertilizer'),
      priority: 'high' as const,
      icon: '🌿',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return colors.success.main;
      case 'warning':
        return colors.warning.main;
      case 'critical':
        return colors.error.main;
      default:
        return colors.text.secondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.primary.main, colors.primary.light]}
        style={styles.headerGradient}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>{t('soil')}</Text>
            <Text style={styles.headerSubtext}>{t('soilMonitoring')}</Text>
          </View>
          <View style={styles.headerIcon}>
            <EmojiIcon emoji="🌱" size={40} />
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        
        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {(['week', 'month', 'year'] as const).map(period => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}>
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === period && styles.periodButtonTextActive,
                ]}>
                {t(period)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Soil Metrics */}
        <View style={styles.metricsGrid}>
          {soilMetrics.map((metric, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 100).duration(400).springify()}>
              <Card
                variant="elevated"
                style={[
                  styles.metricCard,
                  {borderLeftWidth: 4, borderLeftColor: getStatusColor(metric.status)},
                ]}>
              <View style={styles.metricHeader}>
                <EmojiIcon emoji={metric.icon} size={28} />
                <Badge
                  label={t(metric.status)}
                  variant={
                    metric.status === 'good'
                      ? 'success'
                      : metric.status === 'warning'
                      ? 'warning'
                      : 'error'
                  }
                  size="small"
                />
              </View>
              <Text style={styles.metricValue}>
                {metric.value}
                {metric.unit && <Text style={styles.metricUnit}>{metric.unit}</Text>}
              </Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </Card>
            </Animated.View>
          ))}
        </View>

        {/* pH Level Chart */}
        <Card variant="elevated" style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>{t('phLevel')}</Text>
            <Text style={styles.chartSubtitle}>{t('last7Days')}</Text>
          </View>
          <View style={styles.chartContainer}>
            <View style={styles.chartBars}>
              {phData.map((value, index) => (
                <View key={index} style={styles.barContainer}>
                  <View style={styles.barBackground}>
                    <LinearGradient
                      colors={[colors.primary.light, colors.primary.main]}
                      style={[styles.bar, {height: `${((value - 6) / 1.5) * 100}%`}]}
                      start={{x: 0, y: 1}}
                      end={{x: 0, y: 0}}
                    />
                  </View>
                  <Text style={styles.barLabel}>{value}</Text>
                </View>
              ))}
            </View>
          </View>
        </Card>

        {/* Soil Reports */}
        <Card variant="elevated" style={styles.reportsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>{t('soilReports')}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>{t('viewAll')}</Text>
            </TouchableOpacity>
          </View>
          {reports.map((report, index) => (
            <Animated.View
              key={report.id}
              entering={FadeInRight.delay(index * 80).duration(400).springify()}>
              <TouchableOpacity
                style={[
                  styles.reportItem,
                  index < reports.length - 1 && styles.reportItemBorder,
                ]}>
              <View style={styles.reportIcon}>
                <EmojiIcon emoji="📄" size={24} />
              </View>
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDate}>{report.date}</Text>
              </View>
              <EmojiIcon emoji="→" size={20} />
            </TouchableOpacity>
            </Animated.View>
          ))}
        </Card>

        {/* Recommendations */}
        <Card variant="elevated" style={styles.recommendationsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>{t('recommendations')}</Text>
            <Badge label={recommendations.length.toString()} size="small" />
          </View>
          {recommendations.map((rec, index) => (
            <Animated.View
              key={rec.id}
              entering={FadeInDown.delay(index * 100).duration(400).springify()}
              style={[
                styles.recommendationItem,
                index < recommendations.length - 1 && styles.recommendationItemBorder,
              ]}>
              <View style={styles.recommendationIcon}>
                <EmojiIcon emoji={rec.icon} size={24} />
              </View>
              <View style={styles.recommendationInfo}>
                <Text style={styles.recommendationText}>{rec.text}</Text>
                <Badge
                  label={t(rec.priority)}
                  variant={rec.priority === 'high' ? 'error' : 'warning'}
                  size="small"
                  style={styles.recommendationBadge}
                />
              </View>
            </Animated.View>
          ))}
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
  headerGradient: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    ...typography.h2,
    color: colors.text.white,
    marginBottom: spacing.xs,
    fontWeight: '800',
  },
  headerSubtext: {
    ...typography.body2,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: colors.background.default,
    borderRadius: 12,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  },
  periodButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary.main,
  },
  periodButtonText: {
    ...typography.body2,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  periodButtonTextActive: {
    color: colors.text.white,
    fontWeight: '700',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  metricCard: {
    flex: 1,
    minWidth: (width - spacing.md * 3) / 2,
    padding: spacing.md,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  metricValue: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '700',
  },
  metricUnit: {
    ...typography.body2,
    color: colors.text.secondary,
    fontWeight: '400',
  },
  metricLabel: {
    ...typography.body2,
    color: colors.text.secondary,
  },
  chartCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    fontWeight: '700',
  },
  chartSubtitle: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  chartContainer: {
    height: 180,
    justifyContent: 'flex-end',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 150,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  barBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.background.paper,
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 8,
  },
  barLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  reportsCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  recommendationsCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  viewAll: {
    ...typography.body2,
    color: colors.primary.main,
    fontWeight: '600',
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  reportItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  reportIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.light + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  reportDate: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
  },
  recommendationItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  recommendationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.warning.light + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationText: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  recommendationBadge: {
    alignSelf: 'flex-start',
  },
});
