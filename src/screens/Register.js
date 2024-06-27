import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Linking
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../components/Navb";
import Button from "../components/Button";
import Input from "../components/Input";
import PasswordConfirmation from "../components/PasswordConfirmation";
import { ChevronDoubleRightIcon } from "react-native-heroicons/outline";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      password !== "" &&
      confirmPassword !== "" &&
      password !== confirmPassword
    ) {
      setError("Passwords do not match");
    } else {
      setError("");
      // onChange && onChange(password);
    }
  }, [password, confirmPassword]);
  const storeData = async (token, value) => {
    try {
      await AsyncStorage.setItem(token, value);
    } catch (e) {
      console.log(e);
      // saving error
    }
  };
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

  const handleSubmit = async () => {
    // await AsyncStorage.clear();
    const postData = {
      name: name,
      email: email,
      password: password,
    };

    const backendUrl = `${process.env.EXPO_PUBLIC_BACKEND_URL}/signup`;
    // // Handle submit logic here

    // console.log(backendUrl);

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
        const errorData = await response.json();
        // console.log(errorData);
        // console.log("Here1");
        // console.log(errorData);
        setError(errorData.error);
        throw new Error(errorData.error);
      } else {
        const responseData = await response.json();
        console.log("Register successful:", responseData);
        storeData("token", responseData.token);
        storeData("uid", responseData.uid);
        storeData("subscription", responseData.Subscription);

        subscribe();
        // navigation.navigate("Profile");
      }
    } catch (error) {
      // console.log("Here2");
      console.error(error);
    }
    // navigation.navigate('Profile')
  };

  return (
    <ImageBackground
      source={require("../../assets/netflixbg.jpeg")}
      style={styles.background}
    >
      <Navbar />
      <View style={styles.container}>
        <View style={styles.loginBg}>
          <Text style={styles.loginText}>Register</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="rgba(192,192,192,0.5)"
              placeholder="Enter your name"
              style={styles.input}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholderTextColor="rgba(192,192,192,0.5)"
              placeholder="Enter your email"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              placeholderTextColor="rgba(192,192,192,0.5)"
              placeholder="Enter your password"
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <TextInput
              placeholderTextColor="rgba(192,192,192,0.5)"
              placeholder="Confirm your password"
              style={styles.input}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
            />
            {error !== "" && <Text style={styles.errorText}>{error}</Text>}
          </View>
          <Button title="Register" onPress={handleSubmit} />
          <View style={styles.registerContainer}>
            <Text style={styles.newToSiteText}>New to this site?</Text>
            <Text
              onPress={() => navigation.navigate("Login")}
              style={styles.registerNowText}
            >
              Login
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
    alignContent: "center",
    padding: 0,
    margin: 0,
    zIndex: 69,
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loginText: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    marginHorizontal: 180,
    marginLeft: 30,
  },
  loginBg: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: "2%",
    paddingVertical: "5%",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 1)",
    paddingVertical: 10,
  },
  registerContainer: {
    marginTop: 70,
    marginHorizontal: 21,
    flexDirection: "row",
    gap: 5,
  },
  newToSiteText: {
    color: "grey",
  },
  registerNowText: {
    fontWeight: "bold",
    textDecorationLine: "underline",
    color: "grey",
  },
  input: {
    paddingHorizontal: 10,
    paddingLeft: 0,
    paddingVertical: 10,
    color: "rgba(255, 255, 255, 0.6)",
    marginHorizontal: 20,
    marginLeft: 0,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderWidth: 0,
    width: "80%",
    fontSize: 16,
    width: "80%",
    // fontWeight: 500,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default Register;
