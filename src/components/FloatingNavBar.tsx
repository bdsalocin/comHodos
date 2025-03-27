import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, FONT_SIZES } from '../styles/theme';

const FloatingNavBar: React.FC = () => {
  return (
    <SafeAreaView style={styles.navBar}>
      <View style={styles.navBarContent}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="map" size={24} color={COLORS.primary} />
          <Text style={[styles.navText, styles.activeText]}>Carte</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="person" size={24} color={COLORS.text} />
          <Text style={styles.navText}>Profil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="qr-code-scanner" size={24} color={COLORS.text} />
          <Text style={styles.navText}>Scanner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <MaterialIcons name="settings" size={24} color={COLORS.text} />
          <Text style={styles.navText}>Paramètres</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  navBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: FONT_SIZES.small,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    marginTop: 4,
  },
  activeText: {
    color: COLORS.primary,
  },
});

export default FloatingNavBar; 