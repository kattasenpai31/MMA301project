import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MangaHistory from "./history";
import FollowedManga from "./followed";
import DownloadedManga from "./downloaded";

const ComicStorageScreen = () => {
  const TopTab = createMaterialTopTabNavigator();
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarShowIcon: true,
        tabBarScrollEnabled: true, // Cho phép scroll ngang các tab
        tabBarStyle: {
          backgroundColor: "#000", // Màu nền tab
        },
        tabBarLabelStyle: {
          fontSize: 20, // Giảm kích thước font
          textTransform: "none", // Giữ nguyên chữ hoa/thường nếu cần
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#fff", // Màu thanh underline
        },
      }}
    >
      <TopTab.Screen name="history" component={MangaHistory} />
      <TopTab.Screen name="downloaded" component={DownloadedManga} />
      <TopTab.Screen name="followed" component={FollowedManga} />
    </TopTab.Navigator>
  );
};

export default ComicStorageScreen;
