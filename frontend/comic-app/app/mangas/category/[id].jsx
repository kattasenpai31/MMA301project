import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const windowWidth = Dimensions.get("window").width;

let numColumns = 2;
if (windowWidth >= 1200) {
  numColumns = 5;
} else if (windowWidth >= 992) {
  numColumns = 4;
} else if (windowWidth >= 768) {
  numColumns = 3;
}

const ITEM_GAP = 12;
const horizontalPadding = 24;
const ITEM_WIDTH =
  (windowWidth - horizontalPadding - (numColumns - 1) * ITEM_GAP) / numColumns;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4;

const MangaByCategory = () => {
  const { id, name } = useLocalSearchParams();
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMangasByCategory = async (categoryName) => {
      try {
        const response = await fetch(
          `http://localhost:9999/api/mangas/category/${id}`
        );
        const data = await response.json();
        console.log("Fetched mangas: ", data);
        setMangas(data);
      } catch (error) {
        console.error("Failed to fetch mangas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangasByCategory(id);
  }, [id]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.gridItem,
        {
          width: ITEM_WIDTH,
          marginRight: index % numColumns === numColumns - 1 ? 0 : ITEM_GAP,
        },
      ]}
      onPress={() => router.push(`/mangas/${item._id}`)}
    >
      <Image style={styles.gridImage} />
      <View style={styles.gridInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text
          style={[
            styles.status,
            item.status === "completed"
              ? styles.statusCompleted
              : styles.statusOngoing,
          ]}
        >
          {item.status === "completed" ? "Hoàn thành" : "Đang tiến hành"}
        </Text>
        <Text style={styles.categories} numberOfLines={1}>
          {item.categories.map((cat) => cat.name || cat).join(", ")}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thể loại: {name}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : mangas.length === 0 ? (
        <Text style={styles.noData}>Không có manga thuộc thể loại này.</Text>
      ) : (
        <FlatList
          data={mangas}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default MangaByCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 12,
  },
  header: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  noData: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
  list: {
    paddingBottom: 20,
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
});
