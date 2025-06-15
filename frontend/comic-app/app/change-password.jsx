import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePasswordScreen = () => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const newErrors = {};

    if (!currentPassword)
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại.";

    if (!newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 6 ký tự.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validateInputs()) return;

    try {
      const token = await AsyncStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:9999/api/users/change_password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (Platform.OS === "web") {
        alert("Mật khẩu đã được đổi.");
      } else {
        Alert.alert("Thành công", "Mật khẩu đã được đổi.");
      }

      router.back(); // Quay về trang trước
    } catch (err) {
      const msg = err.response?.data?.message || "Đổi mật khẩu thất bại.";

      if (Platform.OS === "web") {
        alert(msg);
      } else {
        Alert.alert("Lỗi", msg);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi Mật Khẩu</Text>

      {/* Mật khẩu hiện tại */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" />
        <TextInput
          placeholder="Mật khẩu hiện tại"
          secureTextEntry
          style={styles.input}
          value={currentPassword}
          onChangeText={(text) => {
            setCurrentPassword(text);
            setErrors((prev) => ({ ...prev, currentPassword: "" }));
          }}
        />
      </View>
      {errors.currentPassword ? (
        <Text style={styles.errorText}>{errors.currentPassword}</Text>
      ) : null}

      {/* Mật khẩu mới */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" />
        <TextInput
          placeholder="Mật khẩu mới"
          secureTextEntry
          style={styles.input}
          value={newPassword}
          onChangeText={(text) => {
            setNewPassword(text);
            setErrors((prev) => ({ ...prev, newPassword: "" }));
          }}
        />
      </View>
      {errors.newPassword ? (
        <Text style={styles.errorText}>{errors.newPassword}</Text>
      ) : null}

      {/* Xác nhận mật khẩu */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#888" />
        <TextInput
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrors((prev) => ({ ...prev, confirmPassword: "" }));
          }}
        />
      </View>
      {errors.confirmPassword ? (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;

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
  errorText: {
    color: "red",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
