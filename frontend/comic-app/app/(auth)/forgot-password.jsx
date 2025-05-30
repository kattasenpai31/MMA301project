import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
const ForgotPasswordScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter email"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TouchableOpacity style={styles.resetButton}>
        <Text style={styles.ResetButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // theme đen
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    color: "white",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333",
  },
  resetButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  ResetButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
