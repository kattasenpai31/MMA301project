import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CategoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Danh sách thể loại</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});
