import { View, Text } from "react-native";
import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>

      {/* Avatar + Camera */}
      <View style={styles.avatarContainer}>
        <Image
          // source={require("@/assets/images/hacker-avatar-with-laptop-free-vector.png")} // Đổi sang avatar mặc định của bạn
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraIcon}>
          <Ionicons name="camera" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tên */}
      <Text style={styles.username}>Khách</Text>

      {/* Mô tả */}
      <Text style={styles.description}>Đăng nhập để đồng bộ dữ liệu</Text>

      {/* Nút đăng nhập */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Nền đen
    alignItems: "center",
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 5,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    color: "#aaa",
    marginTop: 8,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
