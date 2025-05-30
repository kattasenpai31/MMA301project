import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();

  // Giả lập trạng thái đăng nhập
  const username = "Khách"; // hoặc "Katta" nếu đã đăng nhập
  const isLoggedIn = username !== "Khách";

  const handleAvatarPress = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      // logic mở image picker
      console.log("Open image picker to update avatar");
    }
  };
  const handleChangePassword = () => {
    router.push("/change-password"); // ví dụ: định tuyến tới màn hình đổi mật khẩu
  };

  const handleLogout = () => {
    console.log("Đăng xuất người dùng...");
    // Thêm logic xóa token / xóa trạng thái người dùng
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>

      {/* Avatar + Camera */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image
            source={require("@/assets/images/hacker-avatar-with-laptop-free-vector.png")}
            style={styles.avatar}
          />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={20} color="white" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Thông tin */}
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>thangquoc10052020@gmail.com</Text>
      <Text style={styles.userId}>TCM5944</Text>

      {/* Mô tả */}
      {!isLoggedIn && (
        <Text style={styles.description}>Đăng nhập để đồng bộ dữ liệu</Text>
      )}

      {/* Nút đăng nhập */}
      {!isLoggedIn && (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.loginButtonText}>Đăng nhập</Text>
        </TouchableOpacity>
      )}
      {/* Đổi mật khẩu + Đăng xuất */}
      {isLoggedIn && (
        <>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={handleChangePassword}
          >
            <Ionicons name="lock-closed" size={20} color="#2196F3" />
            <Text style={styles.optionText}>Đổi mật khẩu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="#2196F3" />
            <Text style={styles.optionText}>Đăng xuất</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  email: {
    color: "#ccc",
  },
  userId: {
    color: "#ccc",
    marginBottom: 10,
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
