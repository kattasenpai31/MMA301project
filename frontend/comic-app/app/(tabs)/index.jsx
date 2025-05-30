// app/index.jsx

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text } from "react-native";
import MangaHomeScreen from "../mangas/home";
import Category from "../mangas/category";
import ComicStorageScreen from "../mangas/storage";

const TopTab = createMaterialTopTabNavigator();

export default function HomeTopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowIcon: true,
        tabBarIndicatorStyle: { height: 0 },
        tabBarLabel: ({ focused, color }) => {
          if (route.name === "Search") return null;
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
          backgroundColor: "#000",
        },
        tabBarActiveTintColor: "#2196F3",
        tabBarInactiveTintColor: "#888",
      })}
    >
      <TopTab.Screen name="home" component={MangaHomeScreen} />
      <TopTab.Screen name="category" component={Category} />
      <TopTab.Screen name="storage" component={ComicStorageScreen} />
    </TopTab.Navigator>
  );
}
