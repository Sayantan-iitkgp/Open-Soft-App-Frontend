import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity, Linking
} from "react-native";
import {
  VStack,
  Center,
  NativeBaseProvider,
} from "native-base";
import NavBarUserP from "../components1/NavbarUserP.js";
import {
  PencilIcon,
  ListBulletIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { CreditCardIcon, UserCircleIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const UserProfile = () => {
  const users = [
    require("../assets/avatar.png"),
    require("../assets/avatar2.png"),
    require("../assets/avatar3.png"),
    require("../assets/avatar4.png"),
    require("../assets/avatar.png"),
  ];
  const texts = [
    "Account 1",
    "Account 2",
    "Account 3",
    "Account 4",
    "Account 5",
  ];
  const navigation = useNavigation();

  const handleManageProfiles = () => {
    // Handle button press action
    console.log("Manage Profiles button pressed");
  };

  const handleSignOut = () => {
    // Handle button press action
    AsyncStorage.clear();
    navigation.navigate("Login");
  };

  const handleAccountPress = async () => {
    // Handle button account press action
    navigation.navigate("Home", {
      profileId: await AsyncStorage.getItem("profile_id"),
    });
  };

  const handleVstackButtons = () => {
    // Handle button account press action
    console.log("Vstack Press button");
  };
  const [subscription, setSubscription] = useState("None");
  useEffect(() => {
    const fetchSubscription = async () => {
      setSubscription(await AsyncStorage.getItem("subscription"));
    };
    fetchSubscription();
  }, []);

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

  function Example() {
    return (
      <VStack space={3} alignItems="center">
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={async () =>
            navigation.navigate("MyList", {
              profileId: await AsyncStorage.getItem("profile_id"),
            })
          }
        >
          <Center
            w="64"
            h="16"
            bg="#1A1A1A"
            rounded="md"
            shadow={3}
            flexDirection="row"
          >
            <ListBulletIcon size={20} color="white" style={styles.icon2} />
            <Text style={styles.text}>Watchlist</Text>
          </Center>
        </TouchableOpacity>
        {subscription === "None" && (
          <TouchableOpacity
            style={styles.touchableItem}
            onPress={subscribe}
          >
            <Center
              w="64"
              h="16"
              bg="#1A1A1A"
              rounded="md"
              shadow={3}
              flexDirection="row"
            >
              <CreditCardIcon size={20} color="white" style={styles.icon2} />
              <Text style={styles.text}>Subscription</Text>
            </Center>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.touchableItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Center
            w="64"
            h="16"
            bg="#1A1A1A"
            rounded="md"
            shadow={3}
            flexDirection="row"
          >
            <UserCircleIcon size={20} color="white" style={styles.icon2} />
            <Text style={styles.text}>Profiles</Text>
          </Center>
        </TouchableOpacity>
      </VStack>
    );
  }

  return (
    <View style={styles.container}>
      <NavBarUserP title="Profiles & More" />

      <View style={styles.centeredContainer}>
        <TouchableOpacity style={styles.button} onPress={handleManageProfiles}>
          <PencilIcon size={20} color="gray" style={styles.icon1} />
          <Text style={styles.buttonText}>Manage Account</Text>
        </TouchableOpacity>

        <NativeBaseProvider>
          <Example />
        </NativeBaseProvider>

        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign out </Text>
          <UserIcon size={20} color="gray" style={styles.icon1} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 170
  },
  touchableItem: {
    borderRadius: 5,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "gray",
    fontSize: 24,
    fontWeight: "bold",
    // marginBottom: 100
  },
  icon1: {
    marginRight: 10,
    fontSize: 25,
  },
  icon2: {
    marginRight: 5,
    fontSize: 18,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserProfile;
