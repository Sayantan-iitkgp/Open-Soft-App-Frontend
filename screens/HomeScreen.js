import React, { useEffect, useState, useLayoutEffect } from "react";
import { Image, Text, View } from "react-native";
import {
  ScrollView,
  ImageBackground,
  StatusBar,
  Dimensions,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

import Header from "../components/Header";
import Hero from "../components/Hero";
import HeaderTabs from "../components/HeaderTabs";
import Movies from "../components/Movies";
import SearchScreen from "./SearchScreen";
import Drop from "../components/drop";
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollbar: {
    width: "100%",
    height: (Dimensions.get("window").height * 69) / 100,
  },
  lingrad: {
    height: "101%",
  },
  text:
  {
	color:"white",
	"textAlign":"center",
  }
});

const Home =  (p) => {
  console.log("In home screen",p.route.params.profileId);
  const [enteredSearch, setEnteredSearch] = useState("");
  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // value previously stored
        return value;
      }
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };
  // const paramKey = {
  //   mongoid: await AsyncStorage.getItem("profile_id"),
  // }
  // console.log("=======param key if any=========", await AsyncStorage.getItem("profile_id"));
  // console.log("=======param key if any=========", paramKey.mongoid);
  const searchHandler = (search) => {
    setEnteredSearch(search);
  };
  const [isloading, setIsloading] = useState(true);
  const [res, setres] = useState();
  const [cover, setCover] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [history, setHistory] = useState([]);
  const [keys, setKeys] = useState([]);

  const fetchsearch = async () => {
    // const token = await getData("token");
    // console.log(process.env.EXPO_PUBLIC_BACKEND_URL,p.route.params.profileId);
    await axios
      .post(
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/homedataforapp`,
        {
          profileId: p.route.params.profileId,
        }
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      )
      .then((response) => {
        // console.log("=======================================");
        // console.log(JSON.stringify(response.data.watchlist).slice(0,50));
        // console.log("=======================================");
        setres(response.data);
        // console.log(response.data)
        if (response.data.history) {
          setKeys(Object.keys(response.data.similar_movie));
          setSimilar(
            response.data.similar_movie[
              Object.keys(response.data.similar_movie)[0]
            ]
          );
          setCover(response.data.history);
          setHistory(response.data.history);
        }
        if(response.data.watchlist)
        {
          setWatchlist(response.data.watchlist);
        }
        setIsloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("In useeffect");
    fetchsearch();
  },[]);

  if (!isloading) {
    return (
      <>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />

        <Header onSearch={searchHandler} />
        {enteredSearch == 0 && (
          <>
            <HeaderTabs />

            <ScrollView style={styles.container}>
              <ImageBackground
                source={{
                  uri: "https://facts.net/wp-content/uploads/2023/05/Naruto.jpeg",
                }}
                style={styles.scrollbar}
              >
                <LinearGradient
                  locations={[0, 0.2, 0.5, 0.94]}
                  colors={[
                    "rgba(0,0,0,0.5)",
                    "rgba(0,0,0,0.0)",
                    "rgba(0,0,0,0.0)",
                    "rgba(0,0,0,1)",
                  ]}
                  style={styles.lingrad}
                >
                  {/* <Hero /> */}
                </LinearGradient>
              </ImageBackground>

              <View>
                {res.watchlist && (
                  <>
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 10,
                        fontSize: 25,
                        fontWeight: 500,
                      }}
                    >
                      Watchlist
                    </Text>
                    <Movies data={res.watchlist} />
                  </>
                )}
                {res.history && (
                  <>
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 10,
                        fontSize: 25,
                        fontWeight: 500,
                      }}
                    >
                      History
                    </Text>
                    <Movies data={res.history} />
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 10,
                        fontSize: 25,
                        fontWeight: 500,
                      }}
                    >{`Movie similar to ${keys[0]}`}</Text>
                    {console.log(res.similar_movie[keys[0]])}
                    <Movies data={res.similar_movie[keys[0]]} />
                  </>
                )}
              </View>

              {/* TODO: Have to work on the similar portion */}
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 25,
                  fontWeight: 500,
                }}
              >
                Latest Movies
              </Text>
              <Movies data={res.latest_movie} />
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 25,
                  fontWeight: 500,
                }}
              >
                Best IMDB Rated Movies
              </Text>
              <Movies data={res.best_imdb_movie} />
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 25,
                  fontWeight: 500,
                }}
              >
                Best Tomato Movies
              </Text>
              <Movies data={res.best_tomato_movie} />
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 25,
                  fontWeight: 500,
                }}
              >
                Best English Movies
              </Text>
              <Movies data={res.best_english_movie} />
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 25,
                  fontWeight: 500,
                }}
              >
                Best Hindi Movies
              </Text>
              <Movies data={res.best_hindi_movie} />
            </ScrollView>
          </>
        )}
        {enteredSearch.length > 0 && <SearchScreen search={enteredSearch} />}
      </>
    );
  }
  // return (
  //   <>
  //   <Text style={{ color: "black" }}>hello</Text>
  //   </>
  // )
};

export default Home;
