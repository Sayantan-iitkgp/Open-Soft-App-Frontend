import React, { useState } from "react";
// import Config from "react-native-config";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
} from "react-native";
import Button from "../components/Button";
import Input from "../components/Input";
import Password from "../components/Password";
import Navbar from "../components/Navb";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const storeData = async (value, uid,Subscription) => {
    try {
      // console.log(value)
      await AsyncStorage.setItem("token", value);
      await AsyncStorage.setItem("uid", uid);
      await AsyncStorage.setItem("subscription", Subscription);
      console.log("----------------------after setting-----------------------");
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    const postData = {
      email: email,
      password: password,
    };

    const backendUrl = `${process.env.EXPO_PUBLIC_BACKEND_URL}/login`;
    console.log(backendUrl);
    // Handle submit logic here
    console.log("Submit button pressed");

    try {
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      console.log(response);
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
        console.log(responseData.token);
        console.log("Register successful:", responseData);
        // console.log(responseData.token);
        storeData(responseData.token, responseData.uid,responseData.Subscription);

        console.log(responseData);
        navigation.navigate("Profile");
      }
    } catch (error) {
      // console.log('here3')
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/netflixbg.jpeg")}
      style={styles.background}
    >
      <Navbar />
      <View style={styles.container}>
        <View style={styles.loginBg}>
          <Text style={styles.loginText}>Login</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="rgba(192,192,192,0.5)"
              placeholder="Email or phone number"
              style={styles.emailInput}
              value={email}
              onChangeText={(e) => setEmail(e)}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="rgba(192,192,192,0.5)"
              placeholder="Password"
              style={styles.passwordInput}
              secureTextEntry={true}
              value={password}
              onChangeText={(e) => setPassword(e)}
            />
          </View>
          {error !== "" && <Text style={styles.errorText}>{error}</Text>}
          <Button title="Login" onPress={handleSubmit} />
          <View style={styles.registerContainer}>
            <Text style={styles.newToSiteText}>New to this site?</Text>
            <Text
              onPress={() => navigation.navigate("Register")}
              style={styles.registerNowText}
            >
              Register now
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};
export default Login;
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
    marginHorizontal: 20,
  },
  loginBg: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: "2%",
    paddingVertical: "5%",
  },
  inputContainer: {
    flexDirection: "row",
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
  passwordInput: {
    paddingHorizontal: 10,
    paddingLeft: 0,
    paddingVertical: 10,
    color: "rgba(255, 255, 255, 0.6)",
    marginHorizontal: 20,
    marginLeft: 0,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderWidth: 0,
    fontSize: 16,
    width: "80%",
    // fontWeight: 500,
    // marginTop: 10,
  },
  emailInput: {
    paddingHorizontal: 10,
    paddingLeft: 0,
    paddingVertical: 10,
    color: "rgba(255, 255, 255, 0.6)",
    marginHorizontal: 20,
    marginLeft: 0,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderWidth: 0,
    fontSize: 16,
    width: "80%",
    // fontWeight: 500,
  },
  errorText: {
    color: "red",
    // marginTop: 60,
    textAlign: "center",
  },
});
