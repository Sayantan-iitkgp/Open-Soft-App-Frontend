import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
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

const MovieCard = props => {
    const navigation = useNavigation();
  return(
    <View style={styles.movieCard}>
        <TouchableOpacity activeOpacity={0.5} onPress={()=>navigation.navigate('Movies')}>
            <Image resizeMode='cover' source={props.url}
            style={styles.moviePoster} />
        </TouchableOpacity>
    </View>
  )
}

export default MovieCard