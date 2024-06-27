import React from 'react'

import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Image, TextInput, StyleSheet } 
from 'react-native';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {
    useFonts,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
    Montserrat_800ExtraBold
} from "@expo-google-fonts/montserrat";

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'left',
        paddingTop: 50,
        paddingRight: 25,
        paddingBottom: 15,
        paddingLeft: 25,
        width: '100%',
        backgroundColor: '#000',
    },
    ava: {
        position: 'absolute',
        top: 52,
        right: 15
    },
    leftHeader: {
        flexDirection: 'row',
    },
    searchBar: {
        color: '#FFF',
        paddingHorizontal: 15,
        paddingVertical: 5,
        fontSize: 18,
        // backgroundColor: '#111',
        borderRadius: 2,
        borderWidth: 1,
        // borderColor: '#aaa',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 20,
        // Responsive styles
        width: '69%', // Ensure the search bar doesn't exceed the screen width
        alignSelf: 'stretch',
        backgroundColor: '#222',
    }, 
    avatar: {
        width: 50,
        height: 35,
        borderRadius: 50,
    },
})

const Header = props => {
    const navigation = useNavigation();

    let [fontsLoaded] = useFonts({
        Montserrat_200ExtraLight,
        Montserrat_300Light,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold,
        Montserrat_800ExtraBold
    });

    return fontsLoaded && (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ marginLeft: 3, paddingTop: 5 }}>
                <MagnifyingGlassIcon size={30} color="white" strokeWidth={2}/>
            </TouchableOpacity>
            <TextInput placeholder='Search'
                placeholderTextColor='#aaa'
                style={styles.searchBar} 
                onChangeText={search => props.onSearch(search)}/>
            <TouchableOpacity activeOpacity={0.5} style={styles.ava} onPress={()=>navigation.navigate('User')}>
                <Image resizeMode='contain' source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABTYctxxbe-UkKEdlMxXm4FVGD6DqTHkQ0TQ5CQJ9jbOMnG0CYxYcSICcTUQz8DrB7CpKUGpqJVMtEqksLlvSJx2ac3Ak.png?r=a41' }}
                    style={styles.avatar} />
            </TouchableOpacity>
        </View>
    )

}

export default Header