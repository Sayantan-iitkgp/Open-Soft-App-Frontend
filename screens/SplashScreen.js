import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; // Import Animatable

export default function Splash() {
  const navigation = useNavigation();

  useEffect(() => {
    // Set a timeout to navigate to the login screen after 5 seconds (5000 milliseconds)
    const timeout = setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);

    // Clear the timeout to prevent navigation if the component unmounts before the timeout expires
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Add animation to the image */}
      <Animatable.Image
        animation="zoomIn" // Change the animation to zoomIn
        duration={2500} // Adjust duration as needed
        delay={200} // Add a delay if needed
        source={require('../assets/circkle2.png')} // Use your image source
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black', // Change the background color if needed
  },
  logo: {
    width: 300, // Adjust size as needed
    height: 300, // Adjust size as needed
  },
});
