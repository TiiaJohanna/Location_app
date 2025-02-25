import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LocationListScreen() {
  const navigation = useNavigation();
  const [locations, setLocations] = useState([]);

  useEffect(() => {

    // Hakee sijainnit AsyncStoragesta
    const loadLocations = async () => {
      try {
        const storedLocations = await AsyncStorage.getItem('locations');
        if (storedLocations) {
          setLocations(JSON.parse(storedLocations));
        }
      } catch (error) {
        console.error('Error loading locations:', error);
      }
    };

    // Päivittää listan aina, kun näkymä avataan uudestaan
    const unsubscribe = navigation.addListener('focus', loadLocations);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button title="Add new location" onPress={() => navigation.navigate('AddLocation')} color="#6A5ACD" />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Map', { location: item.name })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
            <View style={styles.ratingContainer}>
              {Array(item.rating).fill().map((_, i) => (
                <FontAwesome key={i} name="star" size={16} color="gold" />
              ))}
            </View>
            <FontAwesome name="map-marker" size={24} color="red" style={styles.icon} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Tyylit
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { padding: 15, marginVertical: 10, borderWidth: 1, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold' },
  ratingContainer: { flexDirection: 'row', marginTop: 5 },
  icon: { position: 'absolute', top: 10, right: 10 }
});
