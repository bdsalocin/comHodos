import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, Alert, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS, FONTS, FONT_SIZES, globalStyles } from '../styles/theme';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { signIn, isLoading, error, setIsAuthenticated } = useAuth();

  // Fonction de connexion simplifiée
  const handleLogin = async () => {
    if (email.trim()) {
      console.log("Tentative de connexion avec:", email);
      
      // Tenter la connexion
      try {
        await signIn(email, 'password123');
      } catch (err) {
        console.error("Erreur:", err);
      }
    }
  };

  // Connexion avec réseaux sociaux
  const handleSocialLogin = async (provider: string) => {
    console.log(`Connexion avec ${provider}`);
    try {
      await signIn('social@example.com', 'password123');
    } catch (err) {
      console.error("Erreur:", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#070600" />
        </TouchableOpacity>

        {/* Espace pour l'image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/dino-logo-2.png')} 
            style={styles.logoImage}
            resizeMode="contain" 
          />
        </View>

        {/* Section email */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>ENTREZ {"\n"}VOTRE E-MAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          {/* Bouton de connexion */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>Suivant</Text>
          </TouchableOpacity>

          {/* Séparateur OU */}
          <View style={styles.orContainer}>
            <Text style={styles.orText}>ou</Text>
          </View>

          {/* Boutons de connexion sociale */}
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('google')}
          >
            <MaterialCommunityIcons name="google" size={24} color="#070600" />
            <Text style={styles.socialButtonText}>Continuer avec Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('apple')}
          >
            <MaterialCommunityIcons name="apple" size={24} color="#070600" />
            <Text style={styles.socialButtonText}>Continuer avec Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('facebook')}
          >
            <MaterialCommunityIcons name="facebook" size={24} color="#070600" />
            <Text style={styles.socialButtonText}>Continuer avec Facebook</Text>
          </TouchableOpacity>

          {/* Message d'erreur */}
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          {/* Texte de connexion existante */}
          <View style={styles.existingAccountContainer}>
            <Text style={styles.existingAccountText}>
              Vous avez déjà un compte ? {' '}
              <Text 
                style={styles.loginLink}
                onPress={() => handleLogin()}
              >
                Connectez-vous
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary, // Fond violet sombre
  },
  scrollView: {
    padding: 30,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 80,
    left: 20,
    zIndex: 10,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginTop: 30,
    marginBottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: -60, // Décalage vers la gauche
  },
  logoImage: {
    width: 150,
    height: 150,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: FONT_SIZES.large,
    fontFamily: FONTS.regular,
    marginBottom: 10,
    color: '#070600', // Noir comme sur HomeScreen
    fontWeight: '900',
  },
  input: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#8A7F8D',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: FONT_SIZES.medium,
    marginBottom: 20,
    backgroundColor: COLORS.background,
  },
  loginButton: {
    backgroundColor: '#070600', // Noir comme sur HomeScreen
    borderRadius: 30,
    padding: 16,
    paddingHorizontal: 75,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  loginButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONTS.regular,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#8A7F8D',
  },
  orText: {
    marginHorizontal: 10,
    color: '#070600',
    fontFamily: FONTS.regular,
    fontWeight: 'bold',
    fontSize: FONT_SIZES.small,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#070600',
    borderRadius: 30,
    padding: 16,
    paddingHorizontal: 20,
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  socialButtonText: {
    color: '#070600',
    marginLeft: 10,
    fontSize: 16,
    fontFamily: FONTS.regular,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: FONTS.regular,
  },
  existingAccountContainer: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  existingAccountText: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZES.small,
    color: '#070600',
    textAlign: 'center',
  },
  loginLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#070600',
  },
});

export default LoginScreen; 