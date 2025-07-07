import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileScreen = () => {
  const router = useRouter();

  const [loginName, setLoginName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        const res = await axios.get("http://localhost:9999/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data;
        setLoginName(user.loginName || "");
        setEmail(user.email || "");
        setFullName(user.fullName || "");
        setPhoneNumber(user.phoneNumber || "");
      } catch (err) {
        console.log("Error fetching profile:", err);
        Alert.alert("Lỗi", "Không thể tải thông tin người dùng");
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async () => {
    if (!loginName || !email) {
      Alert.alert("Lỗi", "Tên đăng nhập và email là bắt buộc");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:9999/api/users/edit_profile",
        {
          loginName,
          email,
          fullName,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Thành công", "Chỉnh sửa hồ sơ thành công", [
        { text: "OK", onPress: () => router.replace("/profile") },
      ]);
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert("Lỗi", error?.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa profile</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={20} color="#888" />
        <TextInput
          placeholder="Tên đăng nhập"
          style={styles.input}
          value={loginName}
          onChangeText={setLoginName}
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#888" />
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="person-circle-outline" size={20} color="#888" />
        <TextInput
          placeholder="Họ và tên"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#aaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={20} color="#888" />
        <TextInput
          placeholder="Số điện thoại"
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor="#aaa"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: "#fff",
    paddingVertical: 10,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
