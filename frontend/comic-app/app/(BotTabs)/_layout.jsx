// import React from "react";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import MyTopTabBar from "../../components/MyTopTabBar";
// import HomeScreen from "@/screens/MangaHomeScreen";
// import CategoryScreen from "@/screens/CategoryScreen";
// import SearchScreen from "@/screens/SearchScreen";
// const Tab = createMaterialTopTabNavigator();

// export default function TopTabsLayout() {
//   return (
//     <Tab.Navigator
//       tabBar={(props) => <MyTopTabBar {...props} />}
//       screenOptions={{
//         tabBarStyle: { backgroundColor: "black" },
//       }}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Category" component={CategoryScreen} />
//       <Tab.Screen name="Search" component={SearchScreen} />
//     </Tab.Navigator>
//   );
// }

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();
export default function BotTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          tabBarLabel: "Category",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
