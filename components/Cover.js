import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5 from expo/vector-icons
import Vid from "./Video";
import { EventEmitter } from "events";
import { useNavigation } from "@react-navigation/native";
import { PlayIcon } from "react-native-heroicons/solid";
import { PlusIcon, CreditCardIcon, CheckIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Cover = ({ data }) => {
  console.log(data);
  const initialDescriptionLimit = 20;
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [play, setplay] = useState(true);
  const [subscription, setSubscription] = useState("None");
  const [addedToList, setAddedToList] = useState(false);
  const description = data.plot;
  useEffect(() => {
    const fetchSubscription = async () => {
      setSubscription(await AsyncStorage.getItem("subscription"));
    }
    fetchSubscription();
  },[])
  
  const toggleDescription = () => {
    console.log("Toggling description");
    setShowFullDescription(!showFullDescription);
  };

  const addToWatchlist = async () => {
    let list = await AsyncStorage.getItem("watchlist");
    if (!list) {
      list = JSON.stringify([data]);
    } else {
      const parsedList = JSON.parse(list);
      list = JSON.stringify([...parsedList, data]);
    }
    await AsyncStorage.setItem("watchlist", list);
    setAddedToList(true); // Set added to list to true to change the text
  };
  

  const backendUrl2 = `${process.env.EXPO_PUBLIC_BACKEND_URL}/addhistory`;
  const navigation = useNavigation();
  const playHandler = async() => {
      console.log("Added to history", data);  
      await axios
        .post(backendUrl2, {
          movie: data._id,
          profile: await AsyncStorage.getItem("profile_id"),
        })
        .then((response) => {
          console.log("Success:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    setplay(true);
    navigation.navigate("videoplayer");
  };
  const backendUrl = `${process.env.EXPO_PUBLIC_BACKEND_URL}/addwatchlist`;
  const addToList = async () => {
    console.log("Added to list", data);  
    await axios
      .post(backendUrl, {
        movie: data._id,
        profile: await AsyncStorage.getItem("profile_id"),
      })
      .then((response) => {
        console.log("Success:", response.data);
        setAddedToList(true); // Update state to indicate item is added to list
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
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
      <TouchableOpacity style={styles.movie}>
        <Vid play={play} />
      </TouchableOpacity>

      <View style={styles.movieDetailsContainer}>
        <View style={styles.movieDetails}>
          <Text style={styles.movieTitle}>{data.title}</Text>
          <Text style={styles.movieMeta}>
            Duration: 2h 30m | IMDb Rating: 8.5 | Release Year: 2022
          </Text>
          <Text style={styles.movieDescription}>
            {showFullDescription
              ? description
              : description.slice(0, initialDescriptionLimit)}
            {description.length > initialDescriptionLimit && (
              <Text style={styles.readMore} onPress={toggleDescription}>
                {showFullDescription ? "...Read Less" : "...Read More"}
              </Text>
            )}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          { subscription!=="None" && 
            <TouchableOpacity
            style={[styles.button, styles.playButton]}
            onPress={playHandler}
          >
            <PlayIcon
              name="play"
              size={18}
              color="#000"
              style={styles.playIcon}
            />
            <Text style={[styles.buttonText, { color: "#000" }]}>Play</Text>
          </TouchableOpacity>
          }
          { subscription==="None" && 
            <TouchableOpacity
            style={[styles.button, styles.playButton]}
            onPress={subscribe}
          >
            <CreditCardIcon
              name="play"
              size={18}
              color="#000"
              style={styles.playIcon}
            />
            <Text style={[styles.buttonText, { color: "#000" }]}>Subscribe</Text>
          </TouchableOpacity>
          }
          <TouchableOpacity
            style={[
              styles.button,
              styles.downloadButton,
              addedToList && styles.addedToListButton,
            ]}
            onPress={addToList}
          >
            {addedToList ? (
              <CheckIcon
                name="check-circle"
                size={18}
                color="#000"
                style={styles.downloadIcon}
              />
            ) : (
              <PlusIcon
                name="download"
                size={18}
                color="#fff"
                style={styles.downloadIcon}
              />
            )}
            <Text
              style={[
                styles.buttonText,
                { color: addedToList ? "#000" : "#fff" },
              ]}
            >
              {addedToList ? "Added to List" : "Add To List"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.recommendedMovies}>
        <Text>Recommended Movies</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  movie: {
    width: "95%",
    height: 300, // Adjust the height as needed
    margin: 10,
    position: "relative",
    overflow: "hidden",
  },
  movieDetailsContainer: {
    width: "95%",
    position: "relative",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    //padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: -25, // Adjust as needed
    zIndex: 1,
  },
  movieDetails: {},
  movieTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  movieMeta: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "sans-serif",
  },
  movieDescription: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 16,
  },
  readMore: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row", // Added flexDirection to align icon and text horizontally
  },
  playButton: {
    backgroundColor: "#e8e8e3",
  },
  downloadButton: {
    backgroundColor: "#262625",
  },
  addedToListButton: {
    backgroundColor: "#fff",
  },
  playIcon: {
    marginRight: 5, // Spacing between icon and text
  },
  downloadIcon: {
    marginRight: 5, // Spacing between icon and text
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  recommendedMovies: {
    marginTop: 5, // Adjust as needed
    // Additional styles for recommended movies component
  },
});

export default Cover;
