import { Center } from 'native-base';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ExpandableStack = ({ title, content , buttonText }) => {
  const [expanded, setExpanded] = useState(false);
const navigator = useNavigation();
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = () => {
    console.log('buy button pressed:', title);
    navigator.navigate('Profile');
  };

  return (
    <TouchableOpacity onPress={toggleExpanded} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {expanded && (
        <View style={styles.expandedContent}>
          <Text>{content}</Text>
          <TouchableOpacity style={styles.button}>
            <Text onPress={handleSubmit} style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop:50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  expandedContent: {
    fontSize: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin:10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ExpandableStack;