import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';

const Drop= () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle search text change
  const handleSearchTextChange = (text) => {
    setSearchText(text);
    // Perform search and update searchResults based on text
    // For demonstration, I'll just use a static list of items
    const results = ['Result 1', 'Result 2', 'Result 3']; // Replace this with actual search results
    setSearchResults(results);
  };

  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={handleSearchTextChange}
        placeholder="Search"
      />
      <ScrollView style={{ maxHeight: 200 }}>
        {searchResults.map((result, index) => (
          <TouchableOpacity key={index} style={{ padding: 10, borderBottomWidth: 1, borderColor: 'lightgray' }}>
            <Text>{result}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Drop;
