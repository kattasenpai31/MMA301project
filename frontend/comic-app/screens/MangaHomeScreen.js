import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { TabRouter, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useLayoutEffect } from "react";
import { useRouter } from "expo-router";

const trendingManga = [
  {
    id: "1",
    title: "Mệnh Luân Chi Chủ Khi Đi Bi...",
    // cover: require("../assets/manga1.jpg"),
    views: "13.386",
    genres: ["Hiện Đại", "Mạt Thế"],
    date: "17/05/2025",
  },
  {
    id: "2",
    title: "Thăng Hạng Từ Địa Ngục",
    // cover: require("../assets/manga2.jpg"),
    views: "70.716",
    genres: ["Manhwa", "Action", "Shounen"],
    date: "18/04/2025",
  },
];

const topDay = [
  {
    id: "1",
    title: "Trùng Sinh Không Gian: Cô Vợ Hào Môn...",
    views: "1.891.594",
    chapters: ["Chapter 441", "Chapter 440"],
    date: "26/04/2025",
    // cover: require("../assets/top1.jpg"),
  },
  {
    id: "2",
    title: "Nguyên Long",
    views: "10.589",
    chapters: [],
    date: "",
    // cover: require("../assets/top2.jpg"),
  },
];
export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Trending Manga */}
      <FlatList
        horizontal
        data={trendingManga}
        // renderItem={({ item }) => <MangaCard manga={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 12 }}
        showsHorizontalScrollIndicator={false}
      />

      {/* Bảng xếp hạng */}
      <View style={styles.rankingHeader}>
        <Text style={styles.rankingTitle}>Bảng xếp hạng 🔥🔥🔥</Text>
        <View style={styles.rankingTabs}>
          <TouchableOpacity style={styles.rankingTabActive}>
            <Text style={styles.rankingTabTextActive}>TOP Ngày</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rankingTab}>
            <Text style={styles.rankingTabText}>TOP Tuần</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rankingTab}>
            <Text style={styles.rankingTabText}>TOP Tháng</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* {topDay.map((item, index) => (
        <TopRankingItem key={item.id} manga={item} rank={index + 1} />
      ))} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    flex: 1,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
    marginBottom: 10,
  },
  tab: {
    color: "#aaa",
    fontSize: 16,
  },
  tabActive: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "bold",
  },
  rankingHeader: {
    padding: 12,
  },
  rankingTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  rankingTabs: {
    flexDirection: "row",
    marginTop: 10,
  },
  rankingTab: {
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#1e1e1e",
    borderRadius: 20,
  },
  rankingTabActive: {
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#3b82f6",
    borderRadius: 20,
  },
  rankingTabText: {
    color: "#aaa",
  },
  rankingTabTextActive: {
    color: "#fff",
  },
});
