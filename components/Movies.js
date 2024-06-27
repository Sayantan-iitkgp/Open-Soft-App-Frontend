import React from 'react'
import { TouchableOpacity, View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import MovieCard from './MovieCard';
import Card from './Card';

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 0,
        paddingRight: 0
    },
    label: {
        color: '#fff',
        fontSize: 23,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 10
    },
    movieScroll: {
        paddingLeft: 10
    },
    movieCard: {
        paddingRight: 9,
        flexDirection: 'row'
    },
    moviePoster: {
        width: 200,
        height: 300,
        marginRight: 10,
        marginLeft: 2,
        borderRadius: 3
    }

})

const Movies = (props) => {
   
    const movies = props.data
    // console.log(props)
   
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <ScrollView horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.movieScroll}>
                {movies.map((movie, index) => (
                    <Card item={movie} key={index} style={styles.movieCard}/>
                ))}
            </ScrollView>
        </View>
    )
}

export default Movies