import React, {useEffect} from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {Card} from '@components/Card';
import {Badge} from '@components/Badge';
import {EmojiIcon} from '@components';
import {colors, typography, spacing} from '@theme';
import {format} from 'date-fns';

const {width} = Dimensions.get('window');

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
  icon: string;
  color: string;
  trend?: number;
}

const MetricCard: React.FC<MetricCardProps & {index: number}> = ({
  label,
  value,
  unit,
  icon,
  color,
  trend,
  index,
}) => {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      index * 100,
      withSpring(1, {damping: 12, stiffness: 150})
    );
    opacity.value = withDelay(
      index * 100,
      withTiming(1, {duration: 400, easing: Easing.out(Easing.cubic)})
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Card style={styles.metricCard} variant="elevated">
        <View style={styles.metricHeader}>
          <View style={[styles.metricIconContainer, {backgroundColor: color + '20'}]}>
            <EmojiIcon emoji={icon} size={28} />
          </View>
          {trend !== undefined && (
            <View style={styles.trendContainer}>
              <EmojiIcon emoji={trend > 0 ? '📈' : '📉'} size={14} />
              <Text style={[styles.trendText, {color: trend > 0 ? colors.success.main : colors.error.main}]}>
                {Math.abs(trend)}%
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.metricValue}>
          {value}
          <Text style={styles.metricUnit}>{unit}</Text>
        </Text>
        <Text style={styles.metricLabel}>{label}</Text>
      </Card>
    </Animated.View>
  );
};

const AnimatedBar: React.FC<{value: number; index: number}> = ({value, index}) => {
  const height = useSharedValue(0);

  useEffect(() => {
    height.value = withDelay(
      index * 80 + 400,
      withSpring(value, {damping: 12, stiffness: 100})
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${height.value}%`,
  }));

  return (
    <View style={styles.barContainer}>
      <View style={styles.barBackground}>
        <Animated.View style={animatedStyle}>
          <LinearGradient
            colors={[colors.primary.light, colors.primary.main]}
            style={styles.bar}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
          />
        </Animated.View>
      </View>
      <Text style={styles.barLabel}>{value}%</Text>
    </View>
  );
};

const QuickActionButton: React.FC<{
  icon: string;
  text: string;
  color: string;
  onPress: () => void;
  index: number;
}> = ({icon, text, color, onPress, index}) => {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      800 + index * 100,
      withSpring(1, {damping: 10, stiffness: 150})
    );
    opacity.value = withDelay(
      800 + index * 100,
      withTiming(1, {duration: 400})
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.quickActionWrapper, animatedStyle]}>
      <TouchableOpacity style={styles.quickActionButton} onPress={onPress}>
        <View style={[styles.quickActionIcon, {backgroundColor: color + '20'}]}>
          <EmojiIcon emoji={icon} size={28} />
        </View>
        <Text style={styles.quickActionText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const DashboardScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const upcomingTasks = [
    {id: '1', title: t('waterPlants'), time: '2:00 PM', priority: 'high' as const},
    {id: '2', title: t('checkSoilPh'), time: '10:00 AM', priority: 'medium' as const},
    {id: '3', title: t('fertilizeCrops'), time: '4:00 PM', priority: 'low' as const},
  ];

  const recentActivities = [
    {id: '1', action: t('wateredPlants'), time: '2 hours ago', icon: '💧'},
    {id: '2', action: t('soilPhChecked'), time: '1 day ago', icon: '🌡️'},
    {id: '3', action: t('cropsHarvested'), time: '2 days ago', icon: '🌾'},
  ];

  const waterUsageData = [65, 70, 68, 75, 72, 78, 80];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      
      {/* Header */}
      <LinearGradient
        colors={[colors.primary.main, colors.primary.light]}
        style={styles.headerGradient}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{t('goodMorning')}</Text>
            <Text style={styles.userName}>John Doe</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              const parent = navigation.getParent();
              if (parent) {
                parent.navigate('Settings');
              }
            }}
            style={styles.settingsButton}>
            <EmojiIcon emoji="⚙️" size={24} />
          </TouchableOpacity>
        </View>
        <Text style={styles.date}>{format(new Date(), 'EEEE, MMMM d, yyyy')}</Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        
        {/* Metrics Grid */}
        <View style={styles.metricsContainer}>
          <MetricCard
            label={t('temperature')}
            value={28}
            unit="°C"
            icon="🌡️"
            color={colors.error.main}
            trend={2}
            index={0}
          />
          <MetricCard
            label={t('humidity')}
            value={65}
            unit="%"
            icon="💧"
            color={colors.info.main}
            trend={-3}
            index={1}
          />
          <MetricCard
            label={t('soilMoisture')}
            value={72}
            unit="%"
            icon="🌱"
            color={colors.primary.main}
            trend={5}
            index={2}
          />
          <MetricCard
            label={t('lightIntensity')}
            value={85}
            unit="%"
            icon="☀️"
            color={colors.warning.main}
            trend={1}
            index={3}
          />
        </View>

        {/* Water Usage Chart */}
        <Card variant="elevated" style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.sectionTitle}>{t('waterUsage')}</Text>
            <Text style={styles.chartSubtitle}>{t('last7Days')}</Text>
          </View>
          <View style={styles.chartContainer}>
            <View style={styles.chartBars}>
              {waterUsageData.map((value, index) => (
                <AnimatedBar key={index} value={value} index={index} />
              ))}
            </View>
          </View>
        </Card>

        {/* Upcoming Tasks */}
        <Card variant="elevated" style={styles.tasksCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>{t('upcomingTasks')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Tasks')}>
              <Text style={styles.viewAll}>{t('viewAll')}</Text>
            </TouchableOpacity>
          </View>
          {upcomingTasks.map((task, index) => (
            <Animated.View
              key={task.id}
              entering={FadeInDown.delay(index * 100).duration(400).springify()}>
              <TouchableOpacity
                style={[
                  styles.taskItem,
                  index < upcomingTasks.length - 1 && styles.taskItemBorder,
                ]}>
                <View style={styles.taskContent}>
                  <View style={styles.taskIcon}>
                    <EmojiIcon emoji="✓" size={20} />
                  </View>
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskText}>{task.title}</Text>
                    <Text style={styles.taskDate}>Today, {task.time}</Text>
                  </View>
                </View>
                <Badge
                  label={t(task.priority)}
                  variant={task.priority === 'high' ? 'error' : task.priority === 'medium' ? 'warning' : 'primary'}
                  size="small"
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Card>

        {/* Recent Activities */}
        <Card variant="elevated" style={styles.activitiesCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>{t('recentActivities')}</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>{t('viewAll')}</Text>
            </TouchableOpacity>
          </View>
          {recentActivities.map((activity, index) => (
            <Animated.View
              key={activity.id}
              entering={FadeInUp.delay(index * 100).duration(400).springify()}
              style={[
                styles.activityItem,
                index < recentActivities.length - 1 && styles.activityItemBorder,
              ]}>
              <View style={styles.activityIcon}>
                <EmojiIcon emoji={activity.icon} size={24} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityText}>{activity.action}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </Animated.View>
          ))}
        </Card>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <QuickActionButton
            icon="📊"
            text={t('soilReport')}
            color={colors.primary.light}
            onPress={() => navigation.navigate('Soil')}
            index={0}
          />
          <QuickActionButton
            icon="👥"
            text={t('community')}
            color={colors.info.light}
            onPress={() => navigation.navigate('Community')}
            index={1}
          />
          <QuickActionButton
            icon="💬"
            text={t('messages')}
            color={colors.warning.light}
            onPress={() => navigation.navigate('Messages')}
            index={2}
          />
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
    marginBottom: spacing.sm,
  },
  greeting: {
    ...typography.body2,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.xs,
  },
  userName: {
    ...typography.h2,
    color: colors.text.white,
    fontWeight: '800',
  },
  date: {
    ...typography.body2,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  metricsContainer: {
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
  metricIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trendText: {
    ...typography.caption,
    fontWeight: '600',
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
  tasksCard: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  activitiesCard: {
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
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  taskItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.light + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  taskInfo: {
    flex: 1,
  },
  taskText: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  taskDate: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  activityItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.paper,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    ...typography.body1,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  activityTime: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  quickActionWrapper: {
    flex: 1,
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.default,
    borderRadius: 16,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    ...typography.caption,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
});
