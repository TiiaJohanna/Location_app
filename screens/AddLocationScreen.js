import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddLocationScreen({ navigation }) {
  const [name, setName] = useState(''); // Käyttäjän kirjoittama kaupungin nimi
  const [description, setDescription] = useState(''); // Käyttäjän kirjoittama kuvaus
  const [rating, setRating] = useState(0); // Käyttäjän antama arvio kaupungista (1-5)

  const handleAddLocation = async () => {
    if (!name || !description) { // Tarkistaa että kentät on täytetty
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Hakee tallennetut sijainnit AsyncStoragesta
      const existingLocations = await AsyncStorage.getItem('locations');
      const locations = existingLocations ? JSON.parse(existingLocations) : [];

      // Luo uuden sijainnin
      const newLocation = { id: Date.now().toString(), name, description, rating };
      const updatedLocations = [...locations, newLocation];

      // Tallentaa päivitetyn sijainnin AsyncStorageen
      await AsyncStorage.setItem('locations', JSON.stringify(updatedLocations));

      // Palauttaa takaisin LocationList sivulle
      navigation.navigate('LocationList');
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <Text style={[styles.star, rating >= star ? styles.selectedStar : null]}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddLocation}>
        <Text style={styles.buttonText}>Add new location</Text>
      </TouchableOpacity>
    </View>
  );
}

// Tyylit
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  input: { backgroundColor: '#EDE5F5', padding: 10, borderRadius: 5, marginBottom: 10 },
  ratingContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  star: { fontSize: 30, color: 'gray', marginHorizontal: 5 },
  selectedStar: { color: 'gold' },
  button: { backgroundColor: 'purple', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
