import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const recentManga = [
  {
    id: "1",
    title: "Attack on Titan",
    genres: ["Action", "Drama"],
  },
  {
    id: "2",
    title: "My Hero Academia",
    genres: ["Action", "Superpower"],
  },
  {
    id: "3",
    title: "Jujutsu Kaisen",
    genres: ["Fantasy", "Horror"],
  },
];

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [keywords, setKeywords] = useState([
    "Naruto",
    "One Piece",
    "Bleach",
    "Demon Slayer",
    "Chainsaw Man",
  ]);

  const removeKeyword = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  const clearAll = () => {
    setKeywords([]);
  };

  const renderMangaItem = ({ item }) => (
    <View style={styles.mangaItem}>
      <Text style={styles.mangaTitle}>{item.title}</Text>
      <Text style={styles.mangaGenres}>{item.genres.join(", ")}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        placeholder="Tìm kiếm"
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={(text) => setSearch(text)}
        style={styles.searchInput}
      />

      {/* Recent Keywords Section */}
      {keywords.length > 0 && (
        <View style={styles.section}>
          <View style={styles.headerRow}>
            <Text style={styles.sectionTitle}>Tìm kiếm gần đây</Text>
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clearAll}>Xóa tất cả</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.keywordList}
            nestedScrollEnabled={true}
            contentContainerStyle={{ paddingBottom: 8 }}
            showsVerticalScrollIndicator={false}
          >
            {keywords.map((keyword, index) => (
              <View key={index} style={styles.keywordRow}>
                <Text style={styles.keywordText}>• {keyword}</Text>
                <TouchableOpacity onPress={() => removeKeyword(index)}>
                  <Text style={styles.removeButton}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Recent Manga */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Manga gần đây</Text>
        <FlatList
          data={recentManga}
          keyExtractor={(item) => item.id}
          renderItem={renderMangaItem}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    padding: 16,
  },
  searchInput: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 16,
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    color: "#ccc",
    fontSize: 18,
    fontWeight: "bold",
  },
  clearAll: {
    color: "#ff5c5c",
    fontSize: 14,
  },
  keywordList: {
    maxHeight: 150, // tối đa ~4 dòng (tuỳ font)
    marginTop: 8,
  },
  keywordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  keywordText: {
    color: "#ddd",
    fontSize: 14,
  },
  removeButton: {
    color: "#ff5c5c",
    fontSize: 16,
    marginLeft: 8,
  },
  mangaItem: {
    paddingVertical: 12,
    borderBottomColor: "#222",
    borderBottomWidth: 1,
  },
  mangaTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  mangaGenres: {
    color: "#888",
    fontSize: 14,
    marginTop: 2,
  },
});

export default SearchScreen;
