import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
// import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NavBarUserP = ({ title }) => {
  const navigation = useNavigation()
  const handleBackPress = async() => {
    // Replace 'https://example.com' with the website URL you want to navigate to
    navigation.navigate('Home',{ profileId: await AsyncStorage.getItem("profile_id")});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <ArrowLeftIcon size={24} color="white" strokeWidth={3} alignItems="center" />
        {/* <Text style={styles.backButtonText}>{"< Back"}</Text> */}
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingTop: 40,
    
    borderBottomWidth: 1,
    paddingHorizontal: "5%",
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: "blue",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "white",
  },
};

export default NavBarUserP;
