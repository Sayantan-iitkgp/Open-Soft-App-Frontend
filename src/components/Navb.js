import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Image source={require('../../assets/circkle2.png')} style={styles.title} resizeMode="contain"></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: 110,
    padding: 20,
  },
  title: {
    width: "32%",
    height: "70%"
  },
});

export default Navbar;
