import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// Import des écrans
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileQuestionsScreen from '../screens/ProfileQuestionsScreen';
import SplashScreen from '../screens/SplashScreen';
import MapScreen from '../screens/MapScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * AppNavigator - Gère la navigation principale de l'application
 * 
 * @returns {JSX.Element} Le navigateur principal de l'application
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ProfileQuestionsScreen" component={ProfileQuestionsScreen} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>
  );
} 