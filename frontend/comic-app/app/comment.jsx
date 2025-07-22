import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CommentScreen() {
  const { mangaId } = useLocalSearchParams();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchComments();
    getUserInfo();
  }, [mangaId]);

  const getUserInfo = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:9999/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Lỗi lấy thông tin người dùng:", err.message);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:9999/api/comments/manga/${mangaId}`
      );
      setComments(res.data);
    } catch (err) {
      console.error("Lỗi lấy bình luận:", err.message);
    }
  };

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9999/api/comments",
        { mangaId, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setContent("");
      fetchComments(); // refresh comment list
    } catch (err) {
      console.error("Lỗi gửi bình luận:", err.message);
      Alert.alert("Lỗi", "Không thể gửi bình luận.");
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentBox}>
      <View style={styles.commentHeader}>
        <Image
          source={
            item.user?.avatar
              ? { uri: item.user.avatar }
              : require("@/assets/images/hacker-avatar-with-laptop-free-vector.png")
          }
          style={styles.avatar}
        />
        <Text style={styles.author}>{item.user?.fullName || "Người dùng"}</Text>
      </View>
      <Text style={styles.comment}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Bình luận</Text>

      <FlatList
        data={comments}
        keyExtractor={(item) => item._id}
        renderItem={renderComment}
        style={styles.list}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Viết bình luận..."
          value={content}
          onChangeText={setContent}
          style={styles.input}
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ color: "white" }}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 16 },
  heading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  list: { marginBottom: 20 },
  commentBox: {
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  author: { color: "#0af", fontWeight: "600", marginBottom: 4 },
  comment: { color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#333",
    paddingTop: 8,
  },
  input: {
    flex: 1,
    backgroundColor: "#222",
    padding: 10,
    color: "#fff",
    borderRadius: 6,
    marginRight: 8,
  },
  button: {
    backgroundColor: "#00bfff",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 6,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: "#555", // phòng trường hợp ảnh không load
  },
});
