import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import MapView from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONTS, FONT_SIZES } from '../styles/theme';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={[
          {
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }]
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#f5f5f5' }]
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{ color: '#616161' }]
          },
          {
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'geometry.stroke',
            stylers: [{ color: '#bdbdbd' }]
          },
          {
            featureType: 'administrative.land_parcel',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#bdbdbd' }]
          },
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{ color: '#eeeeee' }]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#757575' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{ color: '#e5e5e5' }]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9e9e9e' }]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{ color: '#ffffff' }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#757575' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{ color: '#dadada' }]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#616161' }]
          },
          {
            featureType: 'road.local',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9e9e9e' }]
          },
          {
            featureType: 'transit.line',
            elementType: 'geometry',
            stylers: [{ color: '#e5e5e5' }]
          },
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{ color: '#eeeeee' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9c9c9' }]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9e9e9e' }]
          }
        ]}
      />

      {/* Barre de navigation flottante */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  map: {
    flex: 1,
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
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

export default MapScreen; 