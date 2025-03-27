import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RootStackParamList } from './types/navigation';

// Import des écrans
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileQuestionsScreen from './screens/ProfileQuestionsScreen';
import SplashScreen from './screens/SplashScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation() {
  const { isAuthenticated, hasCompletedQuestionnaire } = useAuth();

  return (
    <Stack.Navigator 
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false
      }}
    >
      {!isAuthenticated ? (
        // Écrans non authentifiés
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        // Écrans authentifiés
        <>
          {!hasCompletedQuestionnaire ? (
            <Stack.Screen 
              name="ProfileQuestionsScreen" 
              component={ProfileQuestionsScreen}
              options={{
                gestureEnabled: false
              }}
            />
          ) : (
            <Stack.Screen 
              name="MapScreen" 
              component={MapScreen}
              options={{
                gestureEnabled: false
              }}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AuthProvider>
  );
} 