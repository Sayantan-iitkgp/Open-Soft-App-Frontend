import React from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        // fontWeight: 'bold',
        textAlign: 'center',
        // paddingTop: 20,
        color: '#fff',
        paddingBottom: 15
    },
})

const Heading = () => {
  return <Text style={styles.title}>Who's Watching?</Text>;
}

export default Heading;