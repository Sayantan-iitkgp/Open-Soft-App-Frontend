import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { cardStyles } from '../styles/CardStyles';
import { useNavigation } from '@react-navigation/native';

const Card = ({ item }) => {
 
  const navigation = useNavigation();
  const handlePress = () => {
    console.log('Pressed');
   console.log(item);
    navigation.navigate('Movies',{ data:item});
  };
  return (
  <TouchableOpacity onPress={handlePress}>
    <View style={cardStyles.resultSpace}>
      <Image
        style={cardStyles.cardImage}
        source={{uri:item.poster?item.poster:"https://picsum.photos/200/300"}} // Placeholder image source
      />
      <Text style={cardStyles.resultsText}>
        {item.title}
      </Text>
    </View>
  </TouchableOpacity>
  )
};
export default Card;