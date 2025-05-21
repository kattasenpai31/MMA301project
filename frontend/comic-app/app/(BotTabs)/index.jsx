import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import MangaHomeScreen from "@/screens/MangaHomeScreen";
import Category from "@/screens/CategoryScreen";
import Search from "@/screens/SearchScreen";
const TopTab = createMaterialTopTabNavigator();
const index = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Home" component={MangaHomeScreen} />
      <TopTab.Screen name="Category" component={Category} />
      <TopTab.Screen name="Search" component={Search} />
    </TopTab.Navigator>
  );
};

export default index;
