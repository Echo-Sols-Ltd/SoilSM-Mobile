import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {MainTabParamList, MainStackParamList} from './types';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardScreen} from '@screens/main/DashboardScreen';
import {TasksScreen} from '@screens/main/TasksScreen';
import {CommunityScreen} from '@screens/main/CommunityScreen';
import {SoilScreen} from '@screens/main/SoilScreen';
import {MessagesScreen} from '@screens/main/MessagesScreen';
import {SettingsScreen} from '@screens/main/SettingsScreen';
import {colors, typography} from '@theme';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createStackNavigator<MainStackParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border.light,
          paddingTop: 10,
          paddingBottom: 10,
          height: 70, // Increased height for better touch targets
          backgroundColor: colors.background.paper,
        },
        tabBarLabelStyle: {
          ...typography.caption,
          fontWeight: '600',
          fontSize: 12,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => (
            <Text style={{color, fontSize: focused ? 28 : 24}}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({color, focused}) => (
            <Text style={{color, fontSize: focused ? 28 : 24}}>✅</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({color, focused}) => (
            <Text style={{color, fontSize: focused ? 28 : 24}}>👥</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Soil"
        component={SoilScreen}
        options={{
          tabBarLabel: 'Soil',
          tabBarIcon: ({color, focused}) => (
            <Text style={{color, fontSize: focused ? 28 : 24}}>🌱</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, focused}) => (
            <Text style={{color, fontSize: focused ? 28 : 24}}>💬</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerTitle: 'Settings',
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.background.default,
          },
          headerTintColor: colors.primary.main,
          headerTitleStyle: {
            ...typography.h3,
            color: colors.primary.main,
          },
        }}
      />
    </Stack.Navigator>
  );
};

