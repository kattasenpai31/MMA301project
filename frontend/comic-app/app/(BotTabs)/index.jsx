import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import MangaHomeScreen from "@/screens/MangaHomeScreen";
import Category from "@/screens/CategoryScreen";
import Search from "@/screens/SearchScreen";
import ComicStorageScreen from "@/screens/ComicStorageScreen";
const TopTab = createMaterialTopTabNavigator();
const index = () => {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowIcon: true,
        tabBarIndicatorStyle: { height: 0 }, // Ẩn underline
        tabBarLabel: ({ focused, color }) => {
          if (route.name === "Search") return null; // Ẩn label cho Search
          return (
            <Text
              style={{
                color: focused ? "#2196F3" : "#888",
                fontWeight: "bold",
              }}
            >
              {route.name}
            </Text>
          );
        },
        tabBarStyle: {
          backgroundColor: "#000", // Tùy chỉnh màu nền
        },
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "#888",
      })}
    >
      <TopTab.Screen name="Home" component={MangaHomeScreen} />
      <TopTab.Screen name="Category" component={Category} />
      <TopTab.Screen name="ComicStorage" component={ComicStorageScreen} />
      <TopTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: () => null, // Ẩn chữ "Search"
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={20} color={color} />
          ),
        }}
      />
    </TopTab.Navigator>
  );
};

export default index;
