import React, { useEffect } from 'react'

import { Feather, Ionicons } from '@expo/vector-icons'

import { View, Text, Image, TouchableOpacity, Button, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {PlayIcon} from 'react-native-heroicons/solid'
import {InformationCircleIcon, PlusIcon} from 'react-native-heroicons/outline'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        bottom: 8,
    },
    banner: {
        height: 135,
        width: '100%',
    },
    tags: {
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuTag: {
        color: '#fff',
        padding: 0,
        fontSize: 13,
    },
    separator: {
        width: 3,
        height: 3,
        backgroundColor: '#e8e8e8',
        margin: 6,
        borderRadius: 3,
    },
    menuHero: {
        width: '90%',
        // marginTop: -15,
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 20
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        margin: 10,
        // paddingHorizontal: 8,
        paddingVertical: 8,
    },
    textButton: {
        color: '#FFF',
        fontSize: 18,
        marginLeft: 5,
    },

})

const Hero = () => {
    const tags = ['Sci-Fi TV', 'Teen TV Shows', 'TV Horror']
    const navigation = useNavigation()
    

	return (
		<View style={styles.container}>
			{/* <Image resizeMode='contain' source={{ uri: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/tx1O544a9T7n8Z_G12qaboulQQE/AAAABTAytd1vigKbOPjqKU6DxgabgZoLrjdBz7MaLNmekog0p0h-U7ABf1ccTeNoJ_46ZcPREXOwn06cFBDW5lBu46AeS1jdks0wfIhi_GzIJ4Sc34WhOdNdXJ_7bNaXYAvnMwuDL6d0GZbB0J46IhYI8tMtaNnbkqReYevcWG-LyWFI.webp' }} 
            style={styles.banner}/> */}
			{/* <View style={styles.tags}>
				{tags.map((tag, index) => (
                    <>
                        <Text key={index} style={styles.menuTag}>{tags[index]}</Text>
                        {index!==tags.length-1 && <View style={styles.separator} />}
                    </>
                ))}
			</View> */}
			<View style={styles.menuHero}>
				<TouchableOpacity style={styles.button}
                onPress={()=>navigation.navigate('videoplayer')}>
                    <PlayIcon name='play' size={32} color='white'/>
                    <Text style={styles.textButton}>Play</Text>
                </TouchableOpacity>
				<TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Movies')}>
                    <InformationCircleIcon name='info' size={32} color='white'/>
                    <Text style={styles.textButton}>Info</Text>
                </TouchableOpacity>
				<TouchableOpacity style={styles.button} >
                    <PlusIcon size={32} color='white'/>
                    <Text style={styles.textButton}>Add To List</Text>
                </TouchableOpacity>
			</View>
		</View>
	)
}
export default Hero