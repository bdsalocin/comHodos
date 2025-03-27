import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  Dimensions, 
  Platform, 
  Text 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// Taille et position des éléments de la barre de navigation
const NAV_SIZE = 60;
const SCAN_BUTTON_SIZE = 70;

type NavItem = {
  key: string;
  icon: string;
  label: string;
  screen?: string;
  onPress?: () => void;
};

const navItems: NavItem[] = [
  {
    key: 'map',
    icon: 'map',
    label: 'Carte',
    screen: 'Home'
  },
  {
    key: 'achievements',
    icon: 'emoji-events',
    label: 'Succès',
    screen: 'Achievements'
  },
  {
    key: 'scan',
    icon: 'qr-code-scanner',
    label: 'Scanner',
    screen: 'ScanQR'
  },
  {
    key: 'profile',
    icon: 'person',
    label: 'Profil',
    screen: 'Profile'
  },
  {
    key: 'settings',
    icon: 'settings',
    label: 'Paramètres',
    screen: 'Settings'
  }
];

interface FloatingNavBarProps {
  activeTab?: string;
}

const FloatingNavBar: React.FC<FloatingNavBarProps> = ({ 
  activeTab = 'map'
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [active, setActive] = useState(activeTab);

  // Animations pour le feedback visuel
  const animatedValues = navItems.reduce((acc, item) => {
    acc[item.key] = new Animated.Value(item.key === active ? 1 : 0);
    return acc;
  }, {} as Record<string, Animated.Value>);

  // Fonction pour naviguer vers un écran
  const navigateTo = (item: NavItem) => {
    // Effet de vibration tactile
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Animation de pression
    Animated.sequence([
      Animated.timing(animatedValues[item.key], {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(animatedValues[item.key], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();

    // Mise à jour de l'onglet actif
    setActive(item.key);
    
    // Navigation vers l'écran
    if (item.screen) {
      // @ts-ignore
      navigation.navigate(item.screen);
    } else if (item.onPress) {
      item.onPress();
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BlurView intensity={80} style={styles.blurContainer}>
        <View style={styles.navBar}>
          {navItems.map((item, index) => {
            const isMiddle = index === Math.floor(navItems.length / 2);
            const isActive = active === item.key;
            
            // Animations
            const scale = animatedValues[item.key].interpolate({
              inputRange: [0, 0.8, 1],
              outputRange: [1, 0.9, 1]
            });
            
            const opacity = animatedValues[item.key].interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1]
            });
            
            return (
              <Animated.View 
                key={item.key}
                style={[
                  styles.navItemContainer,
                  isMiddle && styles.middleItemContainer,
                  { transform: [{ scale }], opacity }
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.navItem,
                    isMiddle && styles.middleItem,
                    isActive && styles.activeItem
                  ]}
                  onPress={() => navigateTo(item)}
                  activeOpacity={0.7}
                >
                  <MaterialIcons 
                    name={item.icon as any}
                    size={isMiddle ? 34 : 24} 
                    color={isActive ? '#D14C70' : '#8A7F8D'} 
                  />
                  {!isMiddle && (
                    <Text style={[
                      styles.navItemLabel,
                      isActive && styles.activeItemLabel
                    ]}>
                      {item.label}
                    </Text>
                  )}
                  
                  {isActive && !isMiddle && (
                    <View style={styles.activeIndicator} />
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  blurContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    width: width * 0.9,
    ...Platform.select({
      ios: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
      },
      android: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      },
    }),
    shadowColor: '#062D3F',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: NAV_SIZE,
    paddingHorizontal: 10,
  },
  navItemContainer: {
    flex: 1,
    alignItems: 'center',
  },
  middleItemContainer: {
    flex: 1.5,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 10,
    height: '100%',
    width: '100%',
  },
  middleItem: {
    backgroundColor: '#D14C70',
    borderRadius: SCAN_BUTTON_SIZE / 2,
    height: SCAN_BUTTON_SIZE,
    width: SCAN_BUTTON_SIZE,
    marginTop: -20,
    shadowColor: '#062D3F',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  navItemLabel: {
    fontSize: 10,
    marginTop: 2,
    color: '#8A7F8D',
  },
  activeItem: {
    backgroundColor: 'rgba(209, 76, 112, 0.1)',
  },
  activeItemLabel: {
    color: '#D14C70',
    fontWeight: 'bold',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#D14C70',
  },
});

export default FloatingNavBar; 