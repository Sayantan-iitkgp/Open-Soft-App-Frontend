import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { ResultsSection, onLoadMore } from '../components/ResultsSection'; // Corrected import statement
import { searchScreenStyles } from '../styles/SearchScreenStyles'; // Corrected import statement
import axios from 'axios';
import { useEffect } from 'react';

import { cardStyles } from '../styles/CardStyles';

const SearchScreen = ({search}) => {
  
  const navigation = useNavigation();
  // const [searchText, setSearchText] = useState(""); // State to manage search input text
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  const [results, setResults] = useState([]); // State for general search results
  const [loading, setLoading] = useState(false); // State to manage loading state

  const fetchsearch = async (search) => {
    const backendUrl = `${process.env.EXPO_PUBLIC_BACKEND_URL}/search`;
    
    await axios.get(backendUrl, {params: {movie: search, autocomplete:"false"}})
    .then((response) =>
    {
      
      setResults(response.data);
      // console.log(results);
      
    })
    .catch((error) => 
    {
      console.log(error);
    });
    
  }
  useEffect(() => {
    if(search) fetchsearch(search);
 }, [search]); 
  
  const onLoadMoreResults = () => onLoadMore(loading, setLoading, setResults);
  
  return (
    <SafeAreaView style={searchScreenStyles.container}>
      <View>
        {results && (
          <ResultsSection results={results} heading={"Results"} onLoadMore={onLoadMoreResults} /> 
        )}
        {!results && (
          <Text  style={{color:"white"}} > No results found</Text>
        )}
      </View>
      
    </SafeAreaView>
  );
};

export default SearchScreen;