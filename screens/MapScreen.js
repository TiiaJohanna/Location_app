import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route }) {
  const { location } = route.params;  // Saadaan valittu sijainti parametrina
  const [coords, setCoords] = useState(null); // Tallennetaan kaupungin koordinaatit

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        // Haetaan kaupungin koordinaatit OpenStreetMap API:sta
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`,
          {
            headers: {
              "User-Agent": "YourAppName/1.0 (your@email.com)", // Pakollinen User-Agent
            }
          }
        );
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        if (data.length > 0) {
          setCoords({
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
          });
        } else {
          Alert.alert("Error", "Location not found");
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        Alert.alert("Error", "Failed to fetch location data.");
      }
    };

    fetchCoordinates();
  }, [location]);

  return (
    <View style={styles.container}>
      {coords ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <Marker coordinate={coords} title={location} />
        </MapView>
      ) : (
        <Text>Loading map...</Text>
      )}
    </View>
  );
}

// Tyylit
const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' }
});
