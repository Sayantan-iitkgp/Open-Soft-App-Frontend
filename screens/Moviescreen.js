import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, StatusBar } from 'react-native';
import RecommendedMovieCard from '../components/RecommendedMovieCard.js';
import Cover from '../components/Cover.js';
import Similar from '../components/Similar.js';
import NavBar from '../components/Navbar.js';
import Header from '../components/Header.js';
import SearchScreen from './SearchScreen.js';
import { useRoute } from '@react-navigation/native';
const Moviescreen = () => {
  const route = useRoute();
  const { data } = route.params;
 
  const [enteredSearch, setEnteredSearch] = useState('')

  const searchHandler = search => {
    setEnteredSearch(search)
  }

  return (
    <View style={styles.container}>
 
      { enteredSearch.length===0 &&
        (<ScrollView contentContainerStyle={styles.movieScrollContainer}>
          <Cover data={data} />
          <View style={styles.movieContainer}>
            
            <View style={styles.similarTitleContainer}>
              <Text style={styles.similarTitle}>Similar Movies</Text>
            </View>
            <View style={styles.similarContainer}>
              <Similar data={data}/>
            </View>
          </View>
        </ScrollView>)
      }
      { enteredSearch.length > 0 && <SearchScreen/> }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: 10,
  },
  logo: {
    width: '40%',
    height: 40,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
    marginLeft: '5%',
  },
  movieContainer: {
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: '3%',
  },
  recommendedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  recommendedTitleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  recommendedTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  similarContainer: {
    width: '100%',
    margin: 'auto'
  },
  similarTitleContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  similarTitle: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Moviescreen;