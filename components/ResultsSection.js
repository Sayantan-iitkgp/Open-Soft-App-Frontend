import React, { useRef, useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { StyleSheet } from "react-native";
import { resultsSectionStyles } from "../styles/ResultSectionStyles"; // Corrected import statement
import Card from "./Card";
import { LoadMoreButton } from "./LoadMoreButton";
import { useNavigation } from "@react-navigation/native";

export const onLoadMore = (loadingState, setLoadingState, setResultsState) => {
  if (!loadingState) {
    setLoadingState(true);
    setTimeout(() => {
      setResultsState((prevResults) => [
        ...prevResults,
        "Movie 4",
        "Movie 5",
        "Movie 6",
      ]); // Add more items to results
      setLoadingState(false);
    }, 1000);
  }
};

export const ResultsSection = ({ results, heading, onLoadMore }) => {
  // console.log(results);
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const [data, setData] = useState([]);
  useEffect(() => {
    // console.log(results);
    setData(results.data);
    // console.log(results.data);
  }, [results]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    if (layoutMeasurement.width + contentOffset.x >= contentSize.width) {
      onLoadMore();
    }
  };
  
  return (
    <View style={styles.cont}>
      {data ? (
        <ScrollView style={{ maxHeight: 250, marginTop: -30 }}>
          {data.map((result, index) => (
            <TouchableOpacity
              key={index}
              style={{
                padding: 10,
                // borderBottomWidth: 1,
                // borderColor: "lightgray",
              }}
              onPress={() => {
                console.log("Pressed");
                console.log(result);
                navigation.navigate("Movies", { data: result });
             
              }}
            >
              <Text style={{ color: "white" , textAlign: "center", fontWeight: 'bold', fontSize: 15}}>{result.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Text>Loading...</Text>
      )}

      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={resultsSectionStyles.resultsContentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {data ? (
          <View style={resultsSectionStyles.cardsContainer}>
            {results?.data?.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </View>
        ) : (
          <Text>No Results</Text>
        )}

      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    height: 1000,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
