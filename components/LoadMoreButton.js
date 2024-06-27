import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { loadMoreButtonStyles } from '../styles/LoadMoreButtonStyles';
import { ArrowRightCircleIcon } from 'react-native-heroicons/outline';

const LoadMoreButton = ({ onPress }) => (
  <View style={loadMoreButtonStyles.loadMoreButtonContainer}>
    <TouchableOpacity onPress={onPress} style={loadMoreButtonStyles.loadMoreButton}>
      <ArrowRightCircleIcon size={60} color="white" strokeWidth={2} />
    </TouchableOpacity>
  </View>
);

export default LoadMoreButton;