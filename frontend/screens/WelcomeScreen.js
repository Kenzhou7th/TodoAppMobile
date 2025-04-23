import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/arice.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Meow's Tasks</Text>
        <Image
          source={require('../assets/meow.jpg')}
          style={styles.centerImage}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },

// style for the main container
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

// style for the title text
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },

// style for the center image
  centerImage: {
    width: 150,
    height: 150, 
    borderRadius: 75, 
    marginBottom: 20,
  },

// style for the button
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '60%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});