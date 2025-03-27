import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import FloatingNavBar from '../components/FloatingNavBar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  // États pour les paramètres
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [locationTracking, setLocationTracking] = React.useState(true);
  const [saveData, setSaveData] = React.useState(false);
  
  // Accès au contexte d'authentification
  const { signOut } = useAuth();
  
  // Fonction pour gérer la déconnexion
  const handleSignOut = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: async () => {
            await signOut();
            navigation.navigate('Login');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Paramètres</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Préférences générales</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Recevoir des notifications sur les nouveaux commerces</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#e1e1e1', true: 'rgba(209, 76, 112, 0.4)' }}
              thumbColor={notifications ? '#D14C70' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Mode sombre</Text>
              <Text style={styles.settingDescription}>Activer le thème sombre pour l'application</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e1e1e1', true: 'rgba(209, 76, 112, 0.4)' }}
              thumbColor={darkMode ? '#D14C70' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Confidentialité</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Localisation en arrière-plan</Text>
              <Text style={styles.settingDescription}>Permettre le suivi de position en arrière-plan</Text>
            </View>
            <Switch
              value={locationTracking}
              onValueChange={setLocationTracking}
              trackColor={{ false: '#e1e1e1', true: 'rgba(209, 76, 112, 0.4)' }}
              thumbColor={locationTracking ? '#D14C70' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Économie de données</Text>
              <Text style={styles.settingDescription}>Réduire l'utilisation des données mobiles</Text>
            </View>
            <Switch
              value={saveData}
              onValueChange={setSaveData}
              trackColor={{ false: '#e1e1e1', true: 'rgba(209, 76, 112, 0.4)' }}
              thumbColor={saveData ? '#D14C70' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Compte</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Modifier le profil</Text>
              <Text style={styles.actionDescription}>Changer vos informations personnelles</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8A7F8D" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Changer le mot de passe</Text>
              <Text style={styles.actionDescription}>Mettre à jour votre mot de passe</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8A7F8D" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionItem, styles.dangerItem]}
            onPress={handleSignOut}
          >
            <View style={styles.actionTextContainer}>
              <Text style={[styles.actionTitle, styles.dangerText]}>Se déconnecter</Text>
              <Text style={styles.actionDescription}>Quitter votre compte</Text>
            </View>
            <MaterialIcons name="exit-to-app" size={24} color="#D14C70" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Conditions d'utilisation</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8A7F8D" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionItem}>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Politique de confidentialité</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#8A7F8D" />
          </TouchableOpacity>
          
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </View>
      </ScrollView>
      
      <FloatingNavBar activeTab="settings" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#BCE0ED',
    shadowColor: '#062D3F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D14C70',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    marginHorizontal: 15,
    shadowColor: '#062D3F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#062D3F',
    marginBottom: 15,
    paddingLeft: 5,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 5,
  },
  settingTextContainer: {
    flex: 1,
    paddingRight: 15,
  },
  settingTitle: {
    fontSize: 16,
    color: '#062D3F',
    marginBottom: 4,
    fontWeight: '600',
  },
  settingDescription: {
    fontSize: 14,
    color: '#8A7F8D',
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingHorizontal: 5,
  },
  actionTextContainer: {
    flex: 1,
    paddingRight: 15,
  },
  actionTitle: {
    fontSize: 16,
    color: '#062D3F',
    marginBottom: 4,
    fontWeight: '600',
  },
  actionDescription: {
    fontSize: 14,
    color: '#8A7F8D',
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#D14C70',
    fontWeight: 'bold',
  },
  versionContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  versionText: {
    fontSize: 14,
    color: '#8A7F8D',
    fontWeight: '500',
  },
});

export default SettingsScreen; 