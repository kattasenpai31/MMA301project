import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react-native";

export default function DescriptionPage() {
  const { id } = useLocalSearchParams();
  const [manga, setManga] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/api/mangas/${id}`);
        setManga(res.data);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };
    fetchData();
  }, [id]);

  if (!manga) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0a0a0a" }}>
      <ScrollView style={styles.container}>
        {/* <Text style={styles.statNumber}>{manga.views ?? "0"}</Text> lay thong tin tu API */}

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>820K</Text>
            <Text style={styles.statLabel}>Lượt xem</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>3.25K</Text>
            <Text style={styles.statLabel}>Theo dõi</Text>
          </View>
        </View>

        {/* Nội dung */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Nội dung</Text>
          <Text style={styles.content}>{manga.description}</Text>
        </View>

        {/* Danh mục */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Danh mục</Text>
          <View style={styles.tagContainer}>
            {Array.isArray(manga.categories) &&
              manga.categories.map((cat, index) => (
                <Text key={index} style={styles.tag}>
                  {cat.name}
                </Text>
              ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  statLabel: {
    fontSize: 13,
    color: "#aaa",
    marginTop: 2,
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 8,
    fontWeight: "600",
  },
  content: {
    color: "#eee",
    fontSize: 14,
    lineHeight: 22,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  tag: {
    borderColor: "#888",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    color: "#fff",
    fontSize: 13,
  },
});
