import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

const CategoryScreen = () => {
  const [categories, setCategories] = useState([
    "Shounen Ai",
    "Cooking",
    "Cổ Đại",
    "Drama",
    "Manhwa",
    "Ngôn Tình",
    "Romance",
    "Truyện Màu",
    "Action",
    "Supernatural",
    "Manga",
    "Comedy",
    "Martial Arts",
    "Horror",
    "School Life",
    "Mystery",
    "Shoujo",
    "Tragedy",
    "Tu Tiên",
    "Hệ Thống",
    "Võng Du",
    "Huyền Bí",
    "Siêu Nhiên",
    "Linh Dị",
    "Cổ Trang",
    "Yaoi",
    "Trùng Sinh",
    "Adaptation",
    "Tiểu Thuyết",
    "Tình Yêu",
    "Dị Năng",
    "Sci-Fi",
  ]);

  const colorScheme = useColorScheme();

  // Gọi API categories từ database (backend) ở đây
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch("https://your-backend.com/api/categories");
  //       const data = await response.json();
  //       setCategories(data);
  //     } catch (error) {
  //       console.error("Failed to fetch categories", error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

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
