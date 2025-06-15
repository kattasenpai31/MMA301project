import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LoginScreen() {
  const router = useRouter();
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { fetchUser } = useUser();
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:9999/api/auth/login", {
        loginName,
        password,
      });

      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));

      await fetchUser();

      // ✅ Alert đa nền tảng
      if (Platform.OS === "web") {
        alert("Đăng nhập thành công!");
      } else {
        Alert.alert("Thành công", "Đăng nhập thành công");
      }

      console.log("Login successful");
      console.log("User data:", res.data.user);
      router.replace("/(tabs)");
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        "Đăng nhập thất bại. Vui lòng kiểm tra thông tin.";

      if (Platform.OS === "web") {
        alert(msg);
      } else {
        Alert.alert("Lỗi", msg);
      }

      setError(msg); // Nếu bạn đang sử dụng error state để hiển thị UI
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={40} color="white" />
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        placeholder="Tên đăng nhập"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={loginName}
        onChangeText={setLoginName}
      />
      <TextInput
        placeholder="Mật khẩu"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Chưa có tài khoản?</Text>
        </TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={styles.link}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
  loginButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 8,
  },
  loginButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginBottom: 10,
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
