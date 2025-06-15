import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

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

const MangaCard = ({ manga, index }) => {
  const router = useRouter();

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
      <Image style={styles.gridImage} />
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
          {manga.categories?.map((cat) => cat.name || cat).join(", ")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MangaCard;

const styles = StyleSheet.create({
  gridItem: {
    backgroundColor: "#1e1e1e",
    marginBottom: 12,
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
