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
import axios from "axios";

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://mongodb:27017/api/category");
        setCategories(response.data.map((item) => item.Categoryname));
      } catch (error) {
        console.error("Failed to fetch categories:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item}-${index}`}
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
