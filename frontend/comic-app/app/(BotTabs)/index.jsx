import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import MangaHomeScreen from "@/screens/MangaHomeScreen";
import Category from "@/screens/CategoryScreen";
import Search from "@/screens/SearchScreen";
const TopTab = createMaterialTopTabNavigator();
const index = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Home" component={MangaHomeScreen} />
      <TopTab.Screen name="Category" component={Category} />
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
