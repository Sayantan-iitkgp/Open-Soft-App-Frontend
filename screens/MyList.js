import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cardStyles } from '../styles/CardStyles';
import axios from 'axios';
import Card from '../components/Card';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 10,
        paddingTop: 30
    },
    moviePoster: {
        width: 170,
        height: 255,
        marginRight: 10,
        marginLeft: 2,
        marginTop: 15,
        borderRadius: 3,
    },
    label: {
        color: '#fff',
        fontSize: 26,
        marginRight: 10,
        // marginTop: 10,
        // marginBottom: 15,
        marginLeft: 15,
    },
    movieScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // padding: 10,
        marginLeft: 10,
        marginTop: 10,
    },
    backButton: {
        marginTop: -18
    },
})

const MyList = (p) => {
    const navigation = useNavigation()

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(0)

    const backendUrl = `${process.env.EXPO_PUBLIC_BACKEND_URL}/getmylist`;

    const watchlist = async () => {
        console.log(p.route.params.profileId,"-----------------------------------");
        await axios.post(backendUrl, {
              profileId: p.route.params.profileId
            })
        .then(response => {
          console.log('Response data:', response.data);
          setIsLoading(1)
          setMovies(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      
    }
    
    useEffect(() => {
        watchlist();
    },[]);
    if(isLoading)
    {  return(
        <View style={styles.container}>
            <View style={styles.nav}>
                <TouchableOpacity onPress={async()=>navigation.navigate('Home',{ profileId: await AsyncStorage.getItem("profile_id")})}>
                    <ArrowLeftIcon name="play" size={26} color="#fff" strokeWidth={2.5} style={styles.backButton}/>
                </TouchableOpacity>  
                <Text style={{ ...styles.label, fontWeight: 700, paddingBottom: 20 }}>Watchlist</Text>
            </View>
            <ScrollView>
                <View style={styles.movieScroll}>
                    {movies.map((movie, index) => (
                        <Card item={movie} key={index}/>
                    ))}
                </View>
            </ScrollView>
        </View>)
    }
    else{
        return(
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }
};

export default MyList;