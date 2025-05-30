import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={40} color="white" />
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        placeholder="Email hoặc Tên đăng nhập"
        placeholderTextColor="#aaa"
        style={styles.input}
      />
      <TextInput
        placeholder="Mật khẩu"
        placeholderTextColor="#aaa"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton}>
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
