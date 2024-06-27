import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 5,
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    // margin: 5,
  },
  container: {
    alignItems: 'center',
  },
});

const Avatar = (props) => {
  return (
    <View style={styles.container}>
    <Image
      resizeMode='contain'
      source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41' }}
      style={styles.avatar}
    />
    <Text style={styles.text}>{props.label}</Text>
  </View>
);
}

export default Avatar;

