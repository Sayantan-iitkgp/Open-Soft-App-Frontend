import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "red",
    marginTop: 30,
    paddingHorizontal: 80,
    textAlign: "center",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    paddingVertical: 15,
  },
  buttonText: {
    fontWeight:"bold",
    color: "white",
    fontSize: 16,
  },
});

export default Button;
