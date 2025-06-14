import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../../context/UserContext"; // đúng đường dẫn

const ProfileScreen = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const isLoggedIn = !!user;

  const handleAvatarPress = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      Alert.alert("Avatar", "Chức năng chọn ảnh chưa được cài đặt.");
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    Alert.alert("Đăng xuất", "Bạn đã đăng xuất.");
    console.log("User logged out");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>

      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image
            source={
              isLoggedIn && user?.avatar
                ? { uri: user.avatar }
                : require("@/assets/images/hacker-avatar-with-laptop-free-vector.png")
            }
            style={styles.avatar}
          />
          {isLoggedIn && (
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={20} color="white" />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.username}>
        {isLoggedIn ? user.loginName : "Khách"}
      </Text>
      {isLoggedIn && <Text style={styles.email}>{user.email}</Text>}

      {!isLoggedIn && (
        <>
          <Text style={styles.description}>Đăng nhập để đồng bộ dữ liệu</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </>
      )}

      {isLoggedIn && (
        <>
          <TouchableOpacity style={styles.optionButton}>
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
    marginTop: 4,
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
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: "90%",
    gap: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ProfileScreen;
