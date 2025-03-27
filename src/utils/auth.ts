import * as SecureStore from 'expo-secure-store';

// Clé pour le stockage du token
const AUTH_TOKEN_KEY = 'auth_token';

// Interface pour un utilisateur simulé
export interface User {
  uid: string;
  email: string;
  displayName?: string;
}

// Interface pour les erreurs d'authentification
export interface AuthError {
  code: string;
  message: string;
}

// Interface pour les résultats d'authentification
export interface AuthResult {
  success: boolean;
  user?: User;
  error?: AuthError;
}

// Utilisateurs simulés pour le développement
const mockUsers: Record<string, User> = {
  'test@example.com': {
    uid: '1',
    email: 'test@example.com',
    displayName: 'Utilisateur Test'
  }
};

// Mots de passe hachés simulés (en production, utiliser bcrypt ou argon2)
const mockPasswordHashes: Record<string, string> = {
  'test@example.com': 'simulated_hash_for_password123'
};

// Fonction simulant un hachage sécurisé
const simulatePasswordHash = (password: string): string => {
  // En production, utilisez une vraie fonction de hachage comme bcrypt
  return 'simulated_hash_for_' + password;
};

// Fonction simulant la vérification d'un mot de passe
const simulatePasswordVerify = (password: string, hash: string): boolean => {
  // En production, utilisez la fonction de vérification correspondante à votre algorithme de hachage
  return hash === simulatePasswordHash(password);
};

// Utilisateur actuellement connecté
let currentUser: User | null = null;

/**
 * Connexion avec email et mot de passe
 */
export const signIn = async (email: string, password: string): Promise<AuthResult> => {
  try {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Dans une version de développement, accepter tout email avec le mot de passe par défaut
    if (password === 'password123') {
      // Créer un nouvel utilisateur si nécessaire
      let user = mockUsers[email];
      if (!user) {
        user = {
          uid: 'user-' + Date.now(),
          email,
          displayName: email.split('@')[0]
        };
        mockUsers[email] = user;
      }
      
      // Stocker le token de façon sécurisée (simulé)
      const token = 'mock-token-' + Date.now();
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
      
      // Mettre à jour l'utilisateur actuel
      currentUser = user;
      
      return { success: true, user };
    }
    
    // Vérifier si l'utilisateur existe
    const user = mockUsers[email];
    if (!user) {
      return { 
        success: false, 
        error: {
          code: 'auth/user-not-found',
          message: 'Aucun utilisateur trouvé avec cet email'
        }
      };
    }
    
    // Vérifier le mot de passe (avec simulation de hachage)
    const storedHash = mockPasswordHashes[email];
    if (!simulatePasswordVerify(password, storedHash)) {
      return { 
        success: false, 
        error: {
          code: 'auth/wrong-password',
          message: 'Mot de passe incorrect'
        }
      };
    }
    
    // Stocker le token de façon sécurisée (simulé)
    const token = 'mock-token-' + Date.now();
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    
    // Mettre à jour l'utilisateur actuel
    currentUser = user;
    
    return { success: true, user };
  } catch (error: any) {
    return { 
      success: false, 
      error: {
        code: error.code || 'auth/unknown',
        message: error.message || 'Une erreur inconnue est survenue'
      }
    };
  }
};

/**
 * Inscription avec email et mot de passe
 */
export const signUp = async (email: string, password: string): Promise<AuthResult> => {
  try {
    // Simulation d'un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Vérifier si l'utilisateur existe déjà
    if (mockUsers[email]) {
      return { 
        success: false, 
        error: {
          code: 'auth/email-already-in-use',
          message: 'Cette adresse email est déjà utilisée'
        }
      };
    }
    
    // Créer un nouvel utilisateur
    const newUser: User = {
      uid: 'user-' + Date.now(),
      email,
      displayName: email.split('@')[0]
    };
    
    // Ajouter l'utilisateur à la liste
    mockUsers[email] = newUser;
    mockPasswordHashes[email] = simulatePasswordHash(password);
    
    // Stocker le token de façon sécurisée (simulé)
    const token = 'mock-token-' + Date.now();
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    
    // Mettre à jour l'utilisateur actuel
    currentUser = newUser;
    
    return { success: true, user: newUser };
  } catch (error: any) {
    return { 
      success: false, 
      error: {
        code: error.code || 'auth/unknown',
        message: error.message || 'Une erreur inconnue est survenue'
      }
    };
  }
};

/**
 * Déconnexion
 */
export const signOut = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  currentUser = null;
};

/**
 * Vérifier si l'utilisateur est authentifié
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    return !!token;
  } catch (error) {
    return false;
  }
};

/**
 * Récupérer l'utilisateur actuel
 */
export const getCurrentUser = (): User | null => {
  return currentUser;
};

/**
 * Traduire les codes d'erreur en messages compréhensibles
 */
export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Adresse email invalide';
    case 'auth/user-disabled':
      return 'Ce compte utilisateur a été désactivé';
    case 'auth/user-not-found':
      return 'Aucun utilisateur trouvé avec cet email';
    case 'auth/wrong-password':
      return 'Mot de passe incorrect';
    case 'auth/email-already-in-use':
      return 'Cette adresse email est déjà utilisée';
    case 'auth/weak-password':
      return 'Le mot de passe est trop faible';
    case 'auth/network-request-failed':
      return 'Problème de connexion réseau';
    default:
      return 'Une erreur est survenue. Veuillez réessayer.';
  }
}; 