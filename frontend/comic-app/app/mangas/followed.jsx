import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function FollowedScreen() {
  const [follows, setFollows] = useState([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    const fetchFollows = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return; // Không redirect nữa

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

  const renderItem = ({ item }) => {
    const manga = item.manga;
    if (!manga) return null; // Nếu bị null thì bỏ qua

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => router.push(`/mangas/${manga._id}`)}
      >
        <Image source={{ uri: manga.coverImage }} style={styles.image} />
        <Text style={styles.title} numberOfLines={2}>
          {manga.title}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00bfff" />
      </View>
    );
  }

  return (
    <FlatList
      data={follows}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    backgroundColor: "#111",
    borderRadius: 8,
    alignItems: "center",
    paddingBottom: 12,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: "cover",
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    textAlign: "center",
    paddingHorizontal: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});
