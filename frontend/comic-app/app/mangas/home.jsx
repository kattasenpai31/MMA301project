import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

// Sample manga data
const trendingManga = [
  {
    id: "1",
    title: "One Piece",
    cover: "https://images-na.ssl-images-amazon.com/images/I/91NxYvUNf6L.jpg",
    views: 50000,
    genres: ["Adventure", "Action"],
  },
  {
    id: "2",
    title: "Attack on Titan",
    cover: "https://m.media-amazon.com/images/I/81qPzeEO5IL.jpg",
    views: 45000,
    genres: ["Drama", "Horror"],
  },
  {
    id: "3",
    title: "Jujutsu Kaisen",
    cover: "https://cdn.myanimelist.net/images/manga/2/219336.jpg",
    views: 32000,
    genres: ["Supernatural", "Action"],
  },
  {
    id: "4",
    title: "Demon Slayer",
    cover: "https://cdn.myanimelist.net/images/manga/3/179023.jpg",
    views: 41000,
    genres: ["Action", "Historical"],
  },
];

const CARD_WIDTH = 140;

export default function MangaHomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>📚 Tủ sách cập nhật gần đây</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.bookShelf}>
          {trendingManga.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => router.push(`/MangaDetailScreen?id=${item.id}`)}
            >
              <Image source={{ uri: item.cover }} style={styles.coverImage} />
              <View style={styles.infoContainer}>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>
                <Text style={styles.views}>
                  👁 {item.views.toLocaleString()}
                </Text>
                <Text numberOfLines={1} style={styles.genres}>
                  {item.genres.join(", ")}
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
    fontSize: 14,
    fontWeight: "bold",
  },
  views: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
  genres: {
    color: "#888",
    fontSize: 11,
    marginTop: 2,
  },
});
