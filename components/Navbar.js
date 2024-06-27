import React, { useState } from 'react';
import { View, Image, TextInput, StyleSheet, Platform, StatusBar, TouchableOpacity, Modal, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const closeMenu = () => {
    setMenuVisible(false);
  };
  const navigation = useNavigation();
  return (
    <View style={[styles.navbar, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10 }]}>
      {/* Netflix Logo */}
      <Image
        source={{ uri: 'https://www.freepnglogos.com/uploads/netflix-logo-0.png' }} // Replace with actual Netflix logo URL
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Search Bar */}
      <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} color="white" strokeWidth={2} />
                    </TouchableOpacity>
      {/* Hamburger Menu */}
      {Platform.OS === 'android' || Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={toggleMenu}>
          <Ionicons name="menu" size={24} color="white" />
        </TouchableOpacity>
      ) : null}
      {/* Menu Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={closeMenu}
      >
        <View style={styles.menuContainer}>
          <TouchableOpacity onPress={() => console.log('Home pressed')}>
            <Text style={styles.menuOption}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Movies pressed')}>
            <Text style={styles.menuOption}>Movies</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('My List pressed')}>
            <Text style={styles.menuOption}>My List</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Trending pressed')}>
            <Text style={styles.menuOption}>Trending</Text>
          </TouchableOpacity>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Ionicons name="close-circle" size={24} color="white" />

          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  logo: {
    width: '40%',
    height: 40,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
    marginLeft: '5%',
  },
  menuContainer: {
    backgroundColor: '#000',
    padding: 20,
    marginTop: StatusBar.currentHeight + 35, // Adjust based on your navbar height
  },
  menuOption: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 15,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  marginIos: {
    marginBottom: -2, // Margin for iOS
},
marginDefault: {
    marginBottom: 3, // Default margin for other platforms
},
light: {
    backgroundColor: '#FFFFFF',
},
search: {
    flexDirection: 'row',       
    justifyContent: 'space-between', // justify-between
    alignItems: 'center',       // items-center
    marginHorizontal: 16,       // mx-4
},
headerText: {
    color: 'white',     // text-white
    fontSize: 24,       // text-3xl (adjust the size as needed)
    fontWeight: 'bold', // font-bold
},
textH: {
    color: '#eab308',
},
});

export default Navbar;