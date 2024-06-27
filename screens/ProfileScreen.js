import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import Heading from "../components/Heading";
import Avatar from "../components/Avatar";
import { useNavigation } from "@react-navigation/native";
import { PlusIcon } from "react-native-heroicons/outline"; // Import the PlusIcon
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  profile: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow multiple rows of avatars
    justifyContent: "center",
  },
  addProfileButton: {
    backgroundColor: "#333",
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  addProfileButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState("");

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    setNewProfileName(""); // Clear the input when the modal is closed
  };

  const handleAddProfile = async () => {
    const postData = {
      pname: newProfileName,
      uid: await AsyncStorage.getItem("uid"),
    };

    const backendUrl = `${process.env.EXPO_PUBLIC_BACKEND_URL}/createprofile`;

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      // console.log(response);
      if (!response.ok) {
        console.log("here1");
        const errorData = await response.json();
        // console.log(errorData);
        console.log(
          "------------------------------------------------------------------------"
        );
        setError(errorData.error);
        throw new Error(errorData.error);
      } else {
        console.log("here2");
        const responseData = await response.json();
        setProfiles([...profiles, responseData]);
        // console.log(responseData);
      }
    } catch (error) {
      console.log("here3");
      console.error(error);
    }
    // setProfiles([...profiles, newProfileName]); // Add the new profile to the array
    toggleModal(); // Close the modal
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddProfile();
  };
  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("profile_id", value);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };
  const getAllProfiles = async () => {
    console.log("In profile");

    const postData = {
      idToken: await AsyncStorage.getItem("my_token"),
      uid: await AsyncStorage.getItem("uid"),
    };

    const backendUrl = `${process.env.EXPO_PUBLIC_BACKEND_URL}/getallprofile`;

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      // console.log(response);
      if (!response.ok) {
        console.log("here1");
        const errorData = await response.json();
        // console.log(errorData);
        console.log(
          "------------------------------------------------------------------------"
        );
        setError(errorData.error);
        throw new Error(errorData.error);
      } else {
        console.log("here2");
        const responseData = await response.json();
        console.log("ProfilesPage", responseData);
        console.log(responseData[0]._id);
        setProfiles(responseData);
      }
    } catch (error) {
      console.log("herexxx");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <View style={styles.container}>
      <Heading />
      <View style={styles.profile}>
        {profiles.map((profile, index) => (
          <TouchableOpacity
            key={index}
            onPress={async () =>{
              console.log("Navigating with paramKey:", profile._id);
              await AsyncStorage.setItem("profile_id", profile._id);
              // console.log("Navigating with paramKey2:", await AsyncStorage.getItem("profile_id"));
              navigation.navigate("Home", { profileId: await AsyncStorage.getItem("profile_id") })
            }}
          >
            <Avatar label={profile.Profile_name} />
          </TouchableOpacity>
        ))}
        {/* Plus Icon for Add Profile */}
        <TouchableOpacity style={styles.addProfileButton} onPress={toggleModal}>
          <PlusIcon color="#fff" size={50} />
        </TouchableOpacity>
      </View>
      {/* Modal for adding a new profile */}
      {isModalVisible && (
        <View style={styles.modalContent}>
          <Text style={styles.addProfileButtonText}>Add New Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Profile Name"
            value={newProfileName}
            onChangeText={(text) => setNewProfileName(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProfileScreen;
