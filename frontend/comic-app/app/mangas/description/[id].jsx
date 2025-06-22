import { useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{manga.title}</Text>
      <Text style={styles.sectionTitle}>Mô tả</Text>
      <Text style={styles.content}>{manga.description}</Text>

      <Text style={styles.sectionTitle}>Thể loại</Text>
      <Text style={styles.content}>
        {Array.isArray(manga.categories)
          ? manga.categories.map((cat) => cat.name).join(", ")
          : "Chưa cập nhật"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 16,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: "#ccc",
    marginTop: 12,
    marginBottom: 6,
  },
  content: {
    color: "#eee",
    fontSize: 14,
    lineHeight: 22,
  },
});
