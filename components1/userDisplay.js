import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const UserDisplay = ({ imageSource, text }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  text: {
    marginTop: 5,
    fontSize: 13,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserDisplay;
