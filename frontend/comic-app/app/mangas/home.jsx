import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

const CARD_WIDTH = 140;

export default function MangaHomeScreen() {
  const router = useRouter();
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const res = await fetch("http://localhost:9999/api/mangas");
        const data = await res.json();
        setMangas(data);
      } catch (error) {
        console.error("Failed to fetch mangas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangas();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>📚 Tủ sách cập nhật gần đây</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.bookShelf}>
          {mangas.map((manga) => (
            <TouchableOpacity
              key={manga.id}
              style={styles.card}
              onPress={() => router.push(`/mangas/${manga.id}`)}
            >
              <Image
                source={{ uri: manga.coverImage }}
                style={styles.coverImage}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {manga.title}
                </Text>
                <Text
                  style={[
                    styles.status,
                    manga.status === "completed"
                      ? styles.statusCompleted
                      : styles.statusOngoing,
                  ]}
                >
                  {manga.status === "completed"
                    ? "Hoàn thành"
                    : "Đang tiến hành"}
                </Text>
                <Text style={styles.categories} numberOfLines={1}>
                  {manga.categories.map((cat) => cat.name).join(", ")}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
    marginLeft: 12,
  },
  bookShelf: {
    flexDirection: "row",
    paddingLeft: 12,
    paddingRight: 12,
    gap: 12,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    overflow: "hidden",
    width: CARD_WIDTH,
  },
  coverImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 8,
  },
  title: {
    color: "#fff",
    fontSize: 16, // tăng kích thước
    fontWeight: "bold",
  },

  status: {
    fontSize: 12,
    marginTop: 4,
  },

  statusOngoing: {
    color: "#4caf50", // xanh lá
  },

  statusCompleted: {
    color: "#f44336", // đỏ
  },

  categories: {
    color: "#bbb",
    fontSize: 12,
    marginTop: 2,
  },
});
