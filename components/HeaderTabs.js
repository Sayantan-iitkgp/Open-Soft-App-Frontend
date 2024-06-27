import React, {useState, useEffect} from 'react'
import { Dimensions, TouchableOpacity, View, Text, StyleSheet, Linking } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'left',
        width: Dimensions.get('window').width,
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: '#000',
    },
    tabs: {
        color: '#fff',
        fontSize: 18,
        marginHorizontal: 15,
        marginVertical: 20,
        marginTop: 0,
    }
})

const HeaderTabs = () => {
    const navigation = useNavigation()
    const [subscription, setSubscription] = useState("None");
    useEffect(() => {
        const fetchSubscription = async () => {
          setSubscription(await AsyncStorage.getItem("subscription"));
        }
        fetchSubscription();
      },[])

      const subscribe = async () => {
        const uid = await AsyncStorage.getItem("uid");
        const url = `http://10.145.60.63:3000/plans?uid=${uid}&from=reactnative`
        // const url = 'https://www.google.com'
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.error("Don't know how to open URI: " + url);
        }
      }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity onPress={()=>navigation.navigate('Movies')}>
                <Text style={{...styles.tabs, fontWeight: 400}}>Movies</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={async()=>navigation.navigate('MyList',{ profileId: await AsyncStorage.getItem("profile_id")})}>
                <Text style={{...styles.tabs, fontWeight: 400}}>Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('User')}>
                <Text style={{...styles.tabs, fontWeight: 400}}>User Info</Text>
            </TouchableOpacity>
            { subscription === "None" && 
                <TouchableOpacity onPress={subscribe}>
                <Text style={{...styles.tabs, fontWeight: 400}}>Subscription</Text>
            </TouchableOpacity>}
        </View>
    )
}

export default HeaderTabs