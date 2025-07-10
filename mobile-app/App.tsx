import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ProgramsProvider } from './src/context/ProgramsContext';
import { colors } from './src/theme';

// Import screens
import LandingPage from './src/screens/LandingPage';
import TemplatesPage from './src/screens/TemplatesPage';
import MyProgramsPage from './src/screens/MyProgramsPage';
import TemplateCustomizer from './src/screens/TemplateCustomizer';

// Sample data (same as web app)
export const sampleTemplates = [
  {
    id: 1,
    name: 'Beginner Strength',
    category: 'Strength',
    description: 'A basic strength program for beginners.',
    exercises: [
      { id: '1', name: 'Squat', sets: 3, reps: 8, notes: '' },
      { id: '2', name: 'Bench Press', sets: 3, reps: 8, notes: '' },
      { id: '3', name: 'Deadlift', sets: 2, reps: 5, notes: '' },
    ],
  },
  {
    id: 2,
    name: 'Hypertrophy Builder',
    category: 'Hypertrophy',
    description: 'A template focused on muscle growth.',
    exercises: [
      { id: '1', name: 'Leg Press', sets: 4, reps: 12, notes: '' },
      { id: '2', name: 'Incline Dumbbell Press', sets: 4, reps: 10, notes: '' },
      { id: '3', name: 'Lat Pulldown', sets: 4, reps: 12, notes: '' },
    ],
  },
];

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Theme toggle button component
const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  
  return (
    <TouchableOpacity
      style={[
        styles.themeToggle, 
        { 
          backgroundColor: theme.colors.borderLight,
          marginTop: insets.top + 5, // Add safe area top margin
          marginRight: 10,
        }
      ]}
      onPress={toggleTheme}
    >
      <Ionicons 
        name={theme.isDark ? 'sunny' : 'moon'} 
        size={20} 
        color={theme.colors.text} 
      />
    </TouchableOpacity>
  );
};

function TabNavigator() {
  const { theme } = useTheme();
  
  return (
          <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Templates') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'My Programs') {
              iconName = focused ? 'fitness' : 'fitness-outline';
            } else {
              iconName = 'home-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.border,
          },
          headerShown: false, // Hide default headers since we have custom ones
        })}
      >
      <Tab.Screen name="Templates" component={TemplatesPage} />
      <Tab.Screen name="My Programs" component={MyProgramsPage} />
    </Tab.Navigator>
  );
}

function AppContent() {
  const [myPrograms, setMyPrograms] = useState<any[]>([]);
  const { theme } = useTheme();

  // Handler to add a template to my programs
  const handleAddToMyPrograms = (template: any) => {
    // Prevent duplicates by id
    setMyPrograms((prev) => prev.some(p => p.id === template.id) ? prev : [...prev, template]);
  };

  return (
    <NavigationContainer
      theme={{
        dark: theme.isDark,
        colors: {
          primary: colors.primary,
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: colors.primary,
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: '400',
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500',
          },
          bold: {
            fontFamily: 'System',
            fontWeight: '700',
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900',
          },
        },
      }}
    >
      <StatusBar style={theme.isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme.colors.text,
          },
          headerRight: () => <ThemeToggleButton />,
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={LandingPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Main" 
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TemplateCustomizer" 
          component={TemplateCustomizer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  themeToggle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ProgramsProvider>
          <AppContent />
        </ProgramsProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
