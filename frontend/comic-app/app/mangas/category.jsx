import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const colorScheme = useColorScheme();
  const router = useRouter();
  // Gọi API lấy dữ liệu từ NodeJS backend
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:9999/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        router.push({
          pathname: "/mangas/category/[id]",
          params: { id: item._id, name: item.name },
        })
      }
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      numColumns={2}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colorScheme === "dark" ? "#000" : "#fff" },
      ]}
    />
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    paddingVertical: 12,
    backgroundColor: "#111",
    borderRadius: 6,
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
