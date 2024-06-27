import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const cardStyles = StyleSheet.create({
  resultSpace: {
    marginBottom: 16,
    marginVertical: 8,
    marginRight: 5,
    marginTop: 0,
  },
  resultsText: {
    color: 'white',
    fontWeight: 'bold',
    width: width * 0.30,
    textAlign: 'center',
  },
  cardImage: {
    borderRadius: 5,
    width: width * 0.30,
    height: height * 0.25,
    // Add more styles as needed
    marginHorizontal: 3
  },
});
