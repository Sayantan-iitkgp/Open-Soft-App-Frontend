import { StyleSheet } from 'react-native';

export const searchScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchTextInput: {
    paddingBottom: 1,
    paddingLeft: 6,
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
  },
  crossButton: {
    borderRadius: 999,
    padding: 12,
    margin: 4,
    backgroundColor: '#808080',
  },
  // Add more styles as needed
});
