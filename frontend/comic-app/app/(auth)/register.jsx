import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * RegisterScreen: Màn hình đăng ký.
   * @returns Một màn hình đăng ký, bao gồm các trường nhập liệu và nút đăng ký.
   */
  /*******  ce717e17-1899-4336-a665-09814e19f9e3  *******/ const [
    form,
    setForm,
  ] = useState({
    loginName: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!form.loginName) newErrors.loginName = "Vui lòng nhập login name";
    if (!form.email) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!form.password) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else if (form.password.length < 6) {
      newErrors.password = "Mật khẩu phải ít nhất 6 ký tự";
    }
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:9999/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loginName: form.loginName,
          fullName: form.fullName,
          phoneNumber: form.phoneNumber,
          email: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        if (Platform.OS === "web") {
          alert("Đăng ký thành công. Bạn sẽ được chuyển đến trang đăng nhập.");
          router.replace("/login");
        } else {
          Alert.alert(
            "Đăng ký thành công",
            "Tài khoản đã được tạo. Bạn muốn quay lại trang đăng nhập?",
            [
              { text: "Ở lại", style: "cancel" },
              {
                text: "Đi đến đăng nhập",
                onPress: () => router.replace("/login"),
              },
            ]
          );
        }
      } else {
        const data = await response.json();
        const message = data.message || "Đã có lỗi xảy ra";
        if (Platform.OS === "web") {
          alert(`Đăng ký thất bại: ${message}`);
        } else {
          Alert.alert("Đăng ký thất bại", message);
        }
      }
    } catch (error) {
      if (Platform.OS === "web") {
        alert(`Lỗi: ${error.message}`);
      } else {
        Alert.alert("Lỗi", error.message);
      }
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: null });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Login name"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={form.loginName}
        onChangeText={(text) => handleChange("loginName", text)}
      />
      {errors.loginName && <Text style={styles.error}>{errors.loginName}</Text>}

      <TextInput
        placeholder="Full name (optional)"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={form.fullName}
        onChangeText={(text) => handleChange("fullName", text)}
      />

      <TextInput
        placeholder="Phone number (optional)"
        placeholderTextColor="#aaa"
        style={styles.input}
        keyboardType="phone-pad"
        value={form.phoneNumber}
        onChangeText={(text) => handleChange("phoneNumber", text)}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={form.password}
        onChangeText={(text) => handleChange("password", text)}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        placeholder="Confirm password"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
        value={form.confirmPassword}
        onChangeText={(text) => handleChange("confirmPassword", text)}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.RegisterButtonText}>Register</Text>
      </TouchableOpacity>
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
  input: {
    width: "100%",
    backgroundColor: "#1a1a1a",
    color: "white",
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  RegisterButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    width: "100%",
    color: "red",
    fontSize: 13,
    marginBottom: 4,
    textAlign: "left",
  },
});
