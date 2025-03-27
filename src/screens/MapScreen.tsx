import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Alert, Platform, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import FloatingNavBar from '../components/FloatingNavBar';

type MapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Définition des lieux à Montpellier
const MONTPELLIER_PLACES = [
  {
    id: 1,
    name: "Place de la Comédie",
    type: "place",
    coordinate: {
      latitude: 43.6089,
      longitude: 3.8797,
    },
    description: "Place centrale de Montpellier",
    icon: "🎭",
    horaires: "Toujours ouvert",
    isOpen: true,
    points: 150
  },
  {
    id: 2,
    name: "Jardin des Plantes",
    type: "park",
    coordinate: {
      latitude: 43.6147,
      longitude: 3.8647,
    },
    description: "Plus ancien jardin botanique de France",
    icon: "🌳",
    horaires: "6h - 20h",
    isOpen: true,
    points: 150
  },
  {
    id: 3,
    name: "Cathédrale Saint-Pierre",
    type: "church",
    coordinate: {
      latitude: 43.6122,
      longitude: 3.8722,
    },
    description: "Cathédrale gothique du XIVe siècle",
    icon: "⛪",
    horaires: "8h - 19h",
    isOpen: true,
    points: 150
  },
  {
    id: 4,
    name: "Musée Fabre",
    type: "museum",
    coordinate: {
      latitude: 43.6111,
      longitude: 3.8800,
    },
    description: "Musée des beaux-arts",
    icon: "🎨",
    horaires: "10h - 18h",
    isOpen: true,
    points: 150
  },
  {
    id: 5,
    name: "Marché du Lez",
    type: "shopping",
    coordinate: {
      latitude: 43.6222,
      longitude: 3.9122,
    },
    description: "Centre commercial moderne",
    icon: "🛍️",
    horaires: "10h - 20h",
    isOpen: true,
    points: 150
  },
  {
    id: 6,
    name: "Stade de la Mosson",
    type: "sport",
    coordinate: {
      latitude: 43.6222,
      longitude: 3.8122,
    },
    description: "Stade de football",
    icon: "⚽",
    horaires: "9h - 17h",
    isOpen: true,
    points: 150
  },
  {
    id: 7,
    name: "Gare Saint-Roch",
    type: "transport",
    coordinate: {
      latitude: 43.6044,
      longitude: 3.8778,
    },
    description: "Gare principale",
    icon: "🚂",
    horaires: "5h - 23h",
    isOpen: true,
    points: 150
  },
  {
    id: 8,
    name: "Antigone",
    type: "architecture",
    coordinate: {
      latitude: 43.6089,
      longitude: 3.8897,
    },
    description: "Quartier architectural",
    icon: "🏛️",
    horaires: "Toujours ouvert",
    isOpen: true,
    points: 150
  },
  {
    id: 9,
    name: "Parc Montcalm",
    type: "park",
    coordinate: {
      latitude: 43.6189,
      longitude: 3.8697,
    },
    description: "Parc public",
    icon: "🌳",
    horaires: "7h - 21h",
    isOpen: true,
    points: 150
  },
  {
    id: 10,
    name: "Place du Marché aux Fleurs",
    type: "market",
    coordinate: {
      latitude: 43.6100,
      longitude: 3.8750,
    },
    description: "Marché aux fleurs",
    icon: "🌸",
    horaires: "8h - 13h",
    isOpen: true,
    points: 150
  }
];

const MapScreen: React.FC = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState({
    latitude: 43.6109,
    longitude: 3.8772,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission d\'accès à la localisation refusée');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleMyLocationPress = async () => {
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    } else {
      Alert.alert(
        "Localisation non disponible",
        "Impossible d'accéder à votre position. Veuillez vérifier vos paramètres de localisation."
      );
    }
  };

  const renderCustomCallout = (place: typeof MONTPELLIER_PLACES[0]) => (
    <View style={styles.calloutContainer}>
      <Text style={styles.calloutTitle}>{place.name}</Text>
      <Text style={styles.calloutDescription}>{place.description}</Text>
      <View style={styles.calloutInfo}>
        <Text style={styles.calloutHours}>🕒 {place.horaires}</Text>
        <Text style={[styles.calloutStatus, place.isOpen ? styles.openStatus : styles.closedStatus]}>
          {place.isOpen ? '✅ Ouvert' : '❌ Fermé'}
        </Text>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>+{place.points} pts</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Votre position"
            description="Vous êtes ici"
            pinColor="blue"
          />
        )}
        {MONTPELLIER_PLACES.map((place) => (
          <Marker
            key={place.id}
            coordinate={place.coordinate}
            title={place.name}
            description={place.description}
          >
            <View style={styles.markerContainer}>
              <Text style={styles.markerText}>{place.icon}</Text>
            </View>
            <Callout tooltip>
              {renderCustomCallout(place)}
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TouchableOpacity 
        style={styles.myLocationButton}
        onPress={handleMyLocationPress}
      >
        <Text style={styles.myLocationButtonText}>📍</Text>
      </TouchableOpacity>
      <FloatingNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerContainer: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  markerText: {
    fontSize: 20,
  },
  calloutContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 15,
    padding: 15,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  calloutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  calloutHours: {
    fontSize: 12,
    color: '#666',
  },
  calloutStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  openStatus: {
    color: '#4CAF50',
  },
  closedStatus: {
    color: '#F44336',
  },
  pointsContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  pointsText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  myLocationButton: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  myLocationButtonText: {
    fontSize: 24,
  },
});

export default MapScreen; 