import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Star, Bookmark } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

export default function MangaDetail() {
  const { id } = useLocalSearchParams();
  const [manga, setManga] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [readingHistory, setReadingHistory] = useState(null);

  const handleFollow = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    if (!manga || !manga._id) return;

    try {
      if (followed) {
        // BỎ THEO DÕI
        await axios.delete("http://localhost:9999/api/follows", {
          headers: { Authorization: `Bearer ${token}` },
          data: { mangaId: manga._id },
        });
        setFollowed(false);
        if (Platform.OS === "web") {
          alert("Đã bỏ theo dõi.");
        } else {
          Alert.alert("Đã bỏ theo dõi", "Bạn đã huỷ theo dõi manga này.");
        }
      } else {
        // THEO DÕI
        await axios.post(
          "http://localhost:9999/api/follows",
          { mangaId: manga._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFollowed(true);
        if (Platform.OS === "web") {
          alert("Đã theo dõi thành công!");
        } else {
          Alert.alert("Thành công", "Bạn đã theo dõi manga này.");
        }
      }
    } catch (err) {
      console.error(
        "Lỗi theo dõi/bỏ theo dõi:",
        err.response?.data || err.message
      );
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái theo dõi.");
    }
  };

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/api/mangas/${id}`);
        setManga(res.data);
      } catch (err) {
        console.error("Error fetching manga:", err.message);
      }
    };

    const checkFollow = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          `http://localhost:9999/api/follows/check/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFollowed(res.data.followed);
      } catch (err) {
        console.error("Lỗi kiểm tra theo dõi:", err.message);
      }
    };
    const fetchReadingHistory = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(
          `http://localhost:9999/api/reading-history/user/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setReadingHistory(res.data);
      } catch (err) {
        console.error("Lỗi lấy lịch sử đọc:", err.message);
      }
    };
    fetchReadingHistory();
    fetchManga();
    checkFollow(); // kiểm tra theo dõi
  }, [id]);

  if (!manga) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      {/* Header image */}
      <View style={{ position: "relative" }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>
        <Image
          source={{ uri: manga.coverImage }}
          style={styles.coverImage}
          blurRadius={3}
        />

        {/* Overlay mờ tối */}
        <View style={styles.darkOverlay} />

        {/* Nút quay lại */}

        {/* Thông tin truyện */}
        <View style={styles.infoOverlay}>
          <Text style={styles.genre}>
            {Array.isArray(manga.categories)
              ? manga.categories.map((cat) => cat.name).join(", ")
              : "Chưa cập nhật"}
          </Text>
          <Text style={styles.title}>{manga.title}</Text>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/mangas/description/[id]",
                params: { id: manga._id },
              })
            }
            style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
          >
            <Text style={styles.description} numberOfLines={2}>
              {manga.description}
            </Text>
            <Text style={{ color: "#ccc", fontSize: 18, marginLeft: 6 }}>
              ›
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleFollow}>
          <Bookmark color={followed ? "#00bfff" : "#fff"} size={18} />
          <Text style={styles.actionText}>Theo dõi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Star color="#fff" size={18} />
          <Text style={styles.actionText}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
      {readingHistory && (
        <View
          style={{
            backgroundColor: "#1e1e1e",
            marginHorizontal: 14,
            padding: 12,
            borderRadius: 10,
            marginBottom: 8,
          }}
        >
          <Text style={{ color: "#bbb", fontSize: 14 }}>
            Bạn đã đọc đến{" "}
            <Text style={{ color: "#00bfff", fontWeight: "600" }}>
              Chapter {readingHistory.chapter?.number || "?"}
            </Text>{" "}
            vào ngày{" "}
            <Text style={{ color: "#aaa" }}>
              {new Date(readingHistory.lastReadAt).toLocaleDateString("vi-VN")}
            </Text>
          </Text>
        </View>
      )}
      {/* Comments + Rating (fake links) */}
      <TouchableOpacity style={styles.commentSection}>
        <Text style={{ color: "#fff" }}>1 bình luận</Text>
      </TouchableOpacity>

      {/* Chapter List */}
      <View style={styles.chapterSection}>
        <View style={styles.chapterHeader}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            {manga.chapters.length} chapters
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "#b0b0b0" }}>D.s chương</Text>
          </TouchableOpacity>
        </View>

        {manga.chapters.map((chap, index) => (
          <TouchableOpacity
            key={chap._id}
            style={styles.chapterItem}
            onPress={() => router.push(`/chapter/${chap._id}`)}
          >
            <Text style={{ color: "#fff" }}>
              Chapter {chap.chapterNumber} {index === 0 ? "(mới)" : ""}
            </Text>
            <Text style={{ color: "#aaa" }}>{formatDate(chap.createdAt)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 6,
    borderRadius: 20,
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Lớp phủ đen mờ
    zIndex: 1,
  },
  infoOverlay: {
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
    zIndex: 2, // đảm bảo nằm trên lớp overlay
  },
  genre: {
    color: "#ccc",
    fontSize: 14,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 4,
  },
  description: {
    color: "#ccc",
    fontSize: 14,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  actionButton: {
    alignItems: "center",
  },
  actionText: {
    color: "white",
    fontSize: 13,
    marginTop: 4,
  },
  commentSection: {
    padding: 14,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  chapterSection: {
    padding: 14,
  },
  chapterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  chapterItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomColor: "#1a1a1a",
    borderBottomWidth: 1,
  },
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 30));
  const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365));

  if (seconds < 60) return "Vừa xong";
  if (minutes < 60) return `${minutes} phút trước`;
  if (hours < 24) return `${hours} tiếng trước`;
  if (days < 30) return `${days} ngày trước`;
  if (months < 12) return `${months} tháng trước`;
  return `${years} năm trước`;
}
