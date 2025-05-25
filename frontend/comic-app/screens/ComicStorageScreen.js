import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ComicHistory from "./ComicHistory";
import DownloadedComic from "./DownloadedComic";
import FollowedComic from "./FollowedComic";
const ComicStorageScreen = () => {
  const TopTab = createMaterialTopTabNavigator();
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="History" component={ComicHistory} />
      <TopTab.Screen name="Downloaded" component={DownloadedComic} />
      <TopTab.Screen name="ComicStorage" component={FollowedComic} />
    </TopTab.Navigator>
  );
};

export default ComicStorageScreen;
