import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Card} from '@components/Card';
import {Button} from '@components/Button';
import {Input} from '@components/Input';
import {colors, typography, spacing} from '@theme';

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export const TasksScreen: React.FC = () => {
  const {t} = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: t('waterPlants'),
      description: 'Water all plants in the garden',
      date: '2024-01-15',
      time: '14:00',
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      title: t('checkSoilPh'),
      description: 'Check pH levels in soil',
      date: '2024-01-16',
      time: '10:00',
      priority: 'medium',
      completed: false,
    },
  ]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
  });

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed} : task
    ));
  };

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      date: '',
      time: '',
      priority: 'medium',
    });
    setShowAddTask(false);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return colors.error.main;
      case 'medium':
        return colors.secondary.main;
      case 'low':
        return colors.primary.light;
      default:
        return colors.text.secondary;
    }
  };

  if (showAddTask) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
          <Text style={styles.header}>{t('addTask')}</Text>
          <Input
            label={t('title')}
            value={newTask.title}
            onChangeText={text => setNewTask({...newTask, title: text})}
          />
          <Input
            label={t('description')}
            value={newTask.description}
            onChangeText={text => setNewTask({...newTask, description: text})}
            multiline
          />
          <Input
            label={t('date')}
            value={newTask.date}
            onChangeText={text => setNewTask({...newTask, date: text})}
            placeholder="YYYY-MM-DD"
          />
          <Input
            label={t('time')}
            value={newTask.time}
            onChangeText={text => setNewTask({...newTask, time: text})}
            placeholder="HH:MM"
          />
          <View style={styles.priorityContainer}>
            <Text style={styles.priorityLabel}>{t('priority')}</Text>
            <View style={styles.priorityButtons}>
              {(['high', 'medium', 'low'] as const).map(priority => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityButton,
                    newTask.priority === priority && {
                      backgroundColor: getPriorityColor(priority),
                    },
                  ]}
                  onPress={() => setNewTask({...newTask, priority})}>
                  <Text
                    style={[
                      styles.priorityButtonText,
                      newTask.priority === priority && {color: colors.text.white},
                    ]}>
                    {t(priority)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Button
            title={t('addTask')}
            onPress={addTask}
            variant="primary"
            style={styles.button}
          />
          <Button
            title={t('cancel')}
            onPress={() => setShowAddTask(false)}
            variant="outline"
            style={styles.button}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.default} />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{t('tasks')}</Text>
        <TouchableOpacity
          onPress={() => setShowAddTask(true)}
          style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <Card style={[styles.taskCard, item.completed && styles.completedTask]}>
            <TouchableOpacity
              onPress={() => toggleTask(item.id)}
              style={styles.taskContent}>
              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.taskTitle,
                    item.completed && styles.completedText,
                  ]}>
                  {item.title}
                </Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <View style={styles.taskMeta}>
                  <Text style={styles.taskDate}>
                    {item.date} {item.time}
                  </Text>
                  <View
                    style={[
                      styles.priorityBadge,
                      {backgroundColor: getPriorityColor(item.priority)},
                    ]}>
                    <Text style={styles.priorityBadgeText}>
                      {t(item.priority)}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.checkbox,
                  item.completed && styles.checkboxChecked,
                ]}
              />
            </TouchableOpacity>
          </Card>
        )}
      />
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
  content: {
    padding: spacing.md,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.default,
  },
  header: {
    ...typography.h2,
    color: colors.primary.main,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    ...typography.h2,
    color: colors.text.white,
  },
  listContent: {
    padding: spacing.md,
  },
  taskCard: {
    marginBottom: spacing.md,
  },
  completedTask: {
    opacity: 0.6,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  taskDescription: {
    ...typography.body2,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskDate: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  priorityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
  },
  priorityBadgeText: {
    ...typography.caption,
    color: colors.text.white,
    fontWeight: '600',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border.medium,
    marginLeft: spacing.md,
  },
  checkboxChecked: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  priorityContainer: {
    marginBottom: spacing.md,
  },
  priorityLabel: {
    ...typography.body2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  priorityButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border.light,
    alignItems: 'center',
  },
  priorityButtonText: {
    ...typography.body2,
    color: colors.text.primary,
  },
  button: {
    marginTop: spacing.sm,
  },
});

