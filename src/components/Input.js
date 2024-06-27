import React from "react";
import { TextInput as RNTextInput, StyleSheet } from "react-native";

const Input = ({ placeholder, secureTextEntry = false }) => {
  return (
    <RNTextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 150,
    paddingLeft: 0,
    paddingVertical: 10,
    color: "rgba(255, 255, 255, 0.6)",
    marginHorizontal: 20,
    marginLeft: 0,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderWidth: 0,
    fontSize: 16,
    // fontWeight: 500,
  },
});

export default Input;
