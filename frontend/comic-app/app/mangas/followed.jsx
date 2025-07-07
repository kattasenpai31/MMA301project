import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Responsive layout
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

export default function FollowedScreen() {
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:9999/api/follows", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFollows(res.data);
      } catch (err) {
        console.error("Lỗi lấy manga theo dõi:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollows();
  }, []);

  const renderItem = ({ item, index }) => {
    const manga = item.manga;

    return (
      <TouchableOpacity
        style={[
          styles.gridItem,
          {
            width: ITEM_WIDTH,
            marginRight: index % numColumns === numColumns - 1 ? 0 : ITEM_GAP,
          },
        ]}
        onPress={() => router.push(`/mangas/${manga._id}`)}
      >
        <Image source={{ uri: manga.coverImage }} style={styles.gridImage} />
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
            {Array.isArray(manga.categories)
              ? manga.categories.map((cat) => cat.name || cat).join(", ")
              : ""}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {follows.length === 0 ? (
        <Text style={styles.noData}>Bạn chưa theo dõi manga nào.</Text>
      ) : (
        <FlatList
          data={follows}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          numColumns={numColumns}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 12,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    paddingBottom: 20,
  },
  noData: {
    color: "#999",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
  gridItem: {
    backgroundColor: "#1e1e1e",
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
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
