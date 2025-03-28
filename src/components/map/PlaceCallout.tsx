import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Place } from '../../data/places';
import { calculateDistance, openGPS } from '../../utils/locationUtils';
import { markerCalloutStyles } from '../../styles/calloutStyles';

/**
 * Interface des props du composant PlaceCallout
 */
interface PlaceCalloutProps {
  place: Place;
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
}

/**
 * Composant qui affiche une infobulle détaillée pour un lieu sur la carte
 * S'affiche lorsque l'utilisateur clique sur un marqueur
 * 
 * @param place - Informations sur le lieu à afficher
 * @param userLocation - Position de l'utilisateur pour calculer la distance
 */
const PlaceCallout: React.FC<PlaceCalloutProps> = ({ place, userLocation }) => {
  // Calculer la distance si la localisation est disponible
  let distance = null;
  if (userLocation) {
    distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      place.coordinate.latitude,
      place.coordinate.longitude
    );
  }

  return (
    <View style={markerCalloutStyles.gradientCalloutContainer}>
      <LinearGradient
        colors={['#4776E6', '#8E54E9', '#FF4081']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={markerCalloutStyles.gradientCalloutBorder}
      >
        <View style={markerCalloutStyles.calloutContainer}>
          {/* Image du lieu avec légende */}
          <View style={markerCalloutStyles.imageContainer}>
            <Image 
              source={{ uri: place.imageUrl }} 
              style={markerCalloutStyles.placeImage}
              resizeMode="cover"
            />
            <View style={markerCalloutStyles.imageCaptionContainer}>
              <Text style={markerCalloutStyles.imageCaption}>Cliquez sur le bouton ci-dessous</Text>
            </View>
          </View>
          
          {/* Titre et description */}
          <Text style={markerCalloutStyles.calloutTitle}>{place.name}</Text>
          <Text style={markerCalloutStyles.calloutDescription}>{place.description}</Text>
          
          {/* Informations sur les horaires et l'état d'ouverture */}
          <View style={markerCalloutStyles.calloutInfo}>
            <Text style={markerCalloutStyles.calloutHours}>⏱️ {place.horaires}</Text>
            <Text style={[
              markerCalloutStyles.calloutStatus, 
              place.isOpen ? markerCalloutStyles.openStatus : markerCalloutStyles.closedStatus
            ]}>
              {place.isOpen ? 'Ouvert' : 'Fermé'}
            </Text>
          </View>
          
          {/* Affichage de la distance si disponible */}
          {distance !== null && (
            <View style={markerCalloutStyles.distanceContainer}>
              <Text style={markerCalloutStyles.distanceText}>🧭 {distance} km</Text>
            </View>
          )}
          
          {/* Affichage des points */}
          <View style={markerCalloutStyles.pointsContainer}>
            <Text style={markerCalloutStyles.pointsText}>✨ {place.points} pts</Text>
          </View>
          
          {/* Bouton de navigation */}
          <TouchableOpacity
            style={markerCalloutStyles.navigationButton}
            activeOpacity={0.5}
            onPress={() => openGPS(place)}
          >
            <Text style={markerCalloutStyles.navigationButtonText}>🚗 Y ALLER</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default PlaceCallout; 