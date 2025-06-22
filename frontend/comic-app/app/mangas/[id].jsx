import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, Star, Bookmark } from "lucide-react-native";

const screenWidth = Dimensions.get("window").width;

export default function MangaDetail() {
  const { id } = useLocalSearchParams();
  const [manga, setManga] = useState(null);

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/api/mangas/${id}`);
        setManga(res.data);
      } catch (err) {
        console.error("Error fetching manga:", err.message);
      }
    };
    fetchManga();
  }, [id]);

  if (!manga) return null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      {/* Header image */}
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: manga.coverImage }}
          style={styles.coverImage}
          blurRadius={3}
        />

        {/* Overlay mờ tối */}
        <View style={styles.darkOverlay} />

        {/* Nút quay lại */}
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={24} color="white" />
        </TouchableOpacity>

        {/* Thông tin truyện */}
        <View style={styles.infoOverlay}>
          <Text style={styles.genre}>
            {Array.isArray(manga.categories)
              ? manga.categories.map((cat) => cat.name).join(", ")
              : "Chưa cập nhật"}
          </Text>
          <Text style={styles.title}>{manga.title}</Text>
          <TouchableOpacity
            onPress={() => router.push(`/description/${manga._id}`)}
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
        <TouchableOpacity style={styles.actionButton}>
          <Bookmark color="#fff" size={18} />
          <Text style={styles.actionText}>Theo dõi</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Star color="#fff" size={18} />
          <Text style={styles.actionText}>Đánh giá</Text>
        </TouchableOpacity>
      </View>

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
              Chapter {chap.number} {index === 0 ? "(mới)" : ""}
            </Text>
            <Text style={{ color: "#aaa" }}>{formatDate(chap.updatedAt)}</Text>
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
  const diff = Math.abs(now - date);
  const hours = Math.floor(diff / 36e5);
  if (hours < 24) return `${hours} tiếng trước`;
  return date.toLocaleDateString("vi-VN");
}
