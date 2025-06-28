import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Keyboard,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get("window").width;
let numColumns = 2;
if (windowWidth >= 1200) numColumns = 5;
else if (windowWidth >= 992) numColumns = 4;
else if (windowWidth >= 768) numColumns = 3;

const ITEM_GAP = 12;
const horizontalPadding = 24;
const ITEM_WIDTH =
  (windowWidth - horizontalPadding - (numColumns - 1) * ITEM_GAP) / numColumns;
const ITEM_HEIGHT = ITEM_WIDTH * 1.4;
const STORAGE_KEY = "recent_keywords";
const SearchScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [mangas, setMangas] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Load manga và keyword từ AsyncStorage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:9999/api/mangas");
        const data = await res.json();
        setMangas(data);
        setFiltered(data);
      } catch (err) {
        console.error("Lỗi lấy manga:", err);
      }

      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setKeywords(JSON.parse(json));
      } catch (err) {
        console.error("Lỗi lấy keyword từ AsyncStorage:", err);
      }
    };

    fetchData();
  }, []);

  // Lưu vào AsyncStorage khi thay đổi
  const saveKeywords = async (newKeywords) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newKeywords));
    } catch (e) {
      console.error("Lỗi khi lưu keywords:", e);
    }
  };

  // Tìm kiếm khi nhấn Enter
  const handleSubmitSearch = () => {
    const trimmed = search.trim();
    if (!trimmed) {
      setFiltered(mangas);
      Keyboard.dismiss();
      return;
    }

    const results = mangas.filter((manga) =>
      manga.title.toLowerCase().includes(trimmed.toLowerCase())
    );
    setFiltered(results);

    if (!keywords.includes(trimmed)) {
      const newKeywords = [trimmed, ...keywords.slice(0, 9)];
      setKeywords(newKeywords);
      saveKeywords(newKeywords);
    }

    Keyboard.dismiss();
  };

  const removeKeyword = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
    saveKeywords(newKeywords);
  };

  const clearAll = () => {
    setKeywords([]);
    saveKeywords([]);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={item._id}
      style={[
        styles.gridItem,
        {
          width: ITEM_WIDTH,
          marginRight: index % numColumns === numColumns - 1 ? 0 : ITEM_GAP,
        },
      ]}
      onPress={() => router.push(`/mangas/${item._id}`)}
    >
      <Image source={{ uri: item.coverImage }} style={styles.gridImage} />
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
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Search Input */}
      <TextInput
        placeholder="Tìm kiếm manga..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSubmitSearch}
        style={styles.searchInput}
        returnKeyType="search"
      />

      {/* Recent Searches */}
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
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {keywords.map((keyword, index) => (
              <View key={index} style={styles.keywordRow}>
                <TouchableOpacity
                  onPress={() => {
                    setSearch(keyword);
                    setFiltered(
                      mangas.filter((m) =>
                        m.title.toLowerCase().includes(keyword.toLowerCase())
                      )
                    );
                  }}
                >
                  <Text style={styles.keywordText}>• {keyword}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeKeyword(index)}>
                  <Text style={styles.removeButton}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Result Grid */}
      <Text style={[styles.sectionTitle, { marginLeft: 12 }]}>Kết quả</Text>
      <View style={styles.gridContainer}>
        {filtered.map((manga, index) => renderItem({ item: manga, index }))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
    paddingHorizontal: 12,
  },
  searchInput: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    fontSize: 16,
    marginTop: 16,
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
    maxHeight: 150,
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
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    paddingBottom: 24,
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

export default SearchScreen;
