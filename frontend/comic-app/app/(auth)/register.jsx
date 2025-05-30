import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Login name"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        placeholder="Full name (not required)"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Enter phone number (not required)"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Enter password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Enter password again"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.RegisterButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // theme đen
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 32,
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
  registerButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  RegisterButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  link: {
    color: "#bbb",
    fontSize: 14,
    marginHorizontal: 4,
  },
  separator: {
    color: "#555",
    marginHorizontal: 8,
  },
});
