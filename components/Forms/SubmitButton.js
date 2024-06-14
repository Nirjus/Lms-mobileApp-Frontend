import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function SubmitButton({ text, loading, submitCallback }) {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={submitCallback}
        disabled={loading}
      >
        <Text style={styles.text}>{loading ? "Please wait.." : text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 99,
    marginHorizontal: 25,
    marginVertical: 25,
    backgroundColor: "grey",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
});
