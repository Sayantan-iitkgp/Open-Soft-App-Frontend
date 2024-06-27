import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';
import axios from 'axios';
const movies = [
  { id: 13, title: 'Recommended Movie 1', imageUrl: 'https://image.tmdb.org/t/p/original/uNyEVSPeAtJgUBehuQJ8WEFwatN.jpg ',details:'Movie 1 details' },
    { id: 23, title: 'Recommended Movie 2', imageUrl: 'https://image.tmdb.org/t/p/original/zI3E2a3WYma5w8emI35mgq5Iurx.jpg' ,details:'Movie 2 details' },
    { id: 33, title: 'Recommended Movie 3', imageUrl: 'https://image.tmdb.org/t/p/original/MpdROQ5XxQqOMKhJlLUf7PTxIC.jpg',details:'Movie 3 details' },
    { id: 43, title: 'Recommended Movie 1', imageUrl: 'https://image.tmdb.org/t/p/original/uNyEVSPeAtJgUBehuQJ8WEFwatN.jpg ',details:'Movie 1 details' },
    { id: 243, title: 'Recommended Movie 2', imageUrl: 'https://image.tmdb.org/t/p/original/zI3E2a3WYma5w8emI35mgq5Iurx.jpg' ,details:'Movie 2 details' },
    { id: 343, title: 'Recommended Movie 3', imageUrl: 'https://image.tmdb.org/t/p/original/MpdROQ5XxQqOMKhJlLUf7PTxIC.jpg',details:'Movie 3 details' },

  ];


const Similar = ({data}) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const[isloading ,setIsloading]=useState(true);
  const navigation = useNavigation();
const id=data._id;
console.log("hello");
console.log(id);
const [res,setRes]=useState([]);
const fetchdata=async()=>{
  await axios.get(`${process.env.EXPO_PUBLIC_BACKEND_URL}/movie/similar/${id}`).then((response) =>
    {
      console.log(response.data);
      setRes(response.data);
      if(response.data.length!=0){

        setIsloading(false);
      }
    })
    .catch((error) =>
    {
      console.log(error);
    }
    );
}
useEffect(()=>{
  fetchdata();
}
,[]);
if(!isloading){
  return (

    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {res.map((movie,index) => (
         <Card key={index} item={movie} />
        ))}
      </ScrollView>
    </View>
  );
}
return(
  <View>
    <Text>Loading...</Text>
  </View>
);
};
;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  card: {
    width: 200,
    height: 300,
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 3,
        // border: '1px solid #fff',
    },
  cardTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Similar;
