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
const windowWidth = Dimensions.get("window").width;
let numColumns = 2;

if (windowWidth >= 1200) {
  numColumns = 5;
} else if (windowWidth >= 992) {
  numColumns = 4;
} else if (windowWidth >= 768) {
  numColumns = 3;
} else {
  numColumns = 2; // mobile mặc định
}

const ITEM_GAP = 12;
const horizontalPadding = 24; // tổng padding 2 bên
const ITEM_WIDTH =
  (windowWidth - horizontalPadding - (numColumns - 1) * ITEM_GAP) / numColumns;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4;
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

  const recentMangas = mangas
    .filter((manga) => {
      const createdAt = new Date(manga.createdAt);
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return createdAt >= oneWeekAgo;
    })
    .slice(0, 10); // lấy giới hạn 10 manga gần đây nhất

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* --- CẬP NHẬT GẦN ĐÂY --- */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Cập nhật gần đây</Text>
        <TouchableOpacity onPress={() => router.push("/recent")}>
          <Text style={styles.seeAll}>Xem tất cả &gt;</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.bookShelf}>
          {recentMangas.map((manga) => (
            <TouchableOpacity
              key={manga._id}
              style={styles.card}
              onPress={() => router.push(`/mangas/${manga._id}`)}
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
                  {manga.categories.map((cat) => cat.name || cat).join(", ")}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* --- TẤT CẢ MANGA --- */}
      <Text style={[styles.sectionTitle, { marginTop: 20, marginLeft: 12 }]}>
        Tất cả Manga
      </Text>
      <View style={styles.gridContainer}>
        {mangas.map((manga, index) => (
          <TouchableOpacity
            key={manga._id}
            style={[
              styles.gridItem,
              {
                width: ITEM_WIDTH,
                marginRight:
                  index % numColumns === numColumns - 1 ? 0 : ITEM_GAP,
              },
            ]}
            onPress={() => router.push(`/mangas/${manga._id}`)}
          >
            <Image
              source={{ uri: manga.coverImage }}
              style={styles.gridImage}
            />
            <View style={styles.gridInfo}>
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
                {manga.status === "completed" ? "Hoàn thành" : "Đang tiến hành"}
              </Text>
              <Text style={styles.categories} numberOfLines={1}>
                {manga.categories.map((cat) => cat.name || cat).join(", ")}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginTop: 12,
    alignItems: "center",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAll: {
    color: "#2196F3",
    fontSize: 14,
  },
  bookShelf: {
    flexDirection: "row",
    paddingHorizontal: 12,
    gap: 12,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    overflow: "hidden",
    width: 140,
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
    fontSize: 14,
    fontWeight: "bold",
  },
  status: {
    fontSize: 12,
    marginTop: 4,
  },
  statusOngoing: {
    color: "#4caf50",
  },
  statusCompleted: {
    color: "#f44336",
  },
  categories: {
    color: "#bbb",
    fontSize: 12,
    marginTop: 2,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
  },

  gridItem: {
    backgroundColor: "#1e1e1e",
    marginBottom: 12,
    marginRight: ITEM_GAP,
  },

  gridImage: {
    width: "100%",
    height: ITEM_HEIGHT,
    resizeMode: "cover",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  gridInfo: {
    padding: 8,
    backgroundColor: "#1e1e1e",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
