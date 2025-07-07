import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { useUser } from "../../context/UserContext";

const ProfileScreen = () => {
  const router = useRouter();
  const { user, setUser } = useUser();
  const isLoggedIn = !!user;

  const handleAvatarPress = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Thông báo", "Bạn cần cấp quyền truy cập thư viện.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: false,
    });

    if (result.canceled) return;

    const imageUri = result.assets[0].uri;
    await uploadAvatar(imageUri);
  };

  const getMimeType = (ext) => {
    switch (ext.toLowerCase()) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      default:
        return "image/*";
    }
  };
  const dataUrlToBlob = async (dataUrl) => {
    const res = await fetch(dataUrl);
    return await res.blob();
  };

  const uploadAvatar = async (imageUri) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const filename = imageUri.split("/").pop();
      const ext = filename.split(".").pop().toLowerCase();
      const mimeType = getMimeType(ext);

      let file;

      if (Platform.OS === "web") {
        const blob = await dataUrlToBlob(imageUri);
        file = new File([blob], filename, { type: mimeType });
      } else {
        file = {
          uri: imageUri,
          name: filename,
          type: mimeType,
        };
      }

      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("http://localhost:9999/api/users/upload-avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // ❗ KHÔNG set Content-Type
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Upload failed:", data);
        Alert.alert("Lỗi", data.message || "Upload avatar thất bại.");
        return;
      }

      setUser((prev) => ({
        ...prev,
        avatar: data.avatarUrl,
      }));

      Alert.alert("✅ Thành công", "Đã cập nhật avatar!");
    } catch (error) {
      console.error("❗ Lỗi uploadAvatar:", error);
      Alert.alert("Lỗi", "Không thể upload avatar.");
    }
  };
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setUser(null);
    Alert.alert("Đăng xuất", "Bạn đã đăng xuất.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tài khoản</Text>

      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image
            source={
              isLoggedIn && user?.avatar
                ? { uri: `http://localhost:9999${user.avatar}` }
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

      {!isLoggedIn ? (
        <>
          <Text style={styles.description}>Đăng nhập để đồng bộ dữ liệu</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => router.push("/edit-profile")}
          >
            <Ionicons name="create-outline" size={20} color="#2196F3" />
            <Text style={styles.optionText}>Chỉnh sửa profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => router.push("/change-password")}
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
    backgroundColor: "#000", // nền đen
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
