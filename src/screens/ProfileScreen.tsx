import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Utilisateur</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.infoText}>Nom: Utilisateur</Text>
        <Text style={styles.infoText}>Email: utilisateur@exemple.com</Text>
      </View>
      <Button mode="contained" style={styles.button}>
        Se Déconnecter
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  profileInfo: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    width: '80%',
    maxWidth: 300,
  }
}); 