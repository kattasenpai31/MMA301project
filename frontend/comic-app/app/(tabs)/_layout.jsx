import { Ionicons } from "@expo/vector-icons";
import { View, Text, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTopTabs from "./index";
import SearchScreen from "./search";
import ProfileScreen from "./profile";

const Tab = createBottomTabNavigator();

export default function BotTabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 16,
          left: 16,
          right: 16,
          height: Platform.OS === "ios" ? 80 : 70,
          backgroundColor: "black", // nền đen
          borderTopWidth: 1, // Thêm đường kẻ
          borderTopColor: "#fff", // Màu trắng
          paddingTop: 8,

          elevation: 10,
          shadowColor: "#000",
        },
      }}
    >
      <Tab.Screen
        name="index"
        component={HomeTopTabs}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  backgroundColor: focused ? "#1a1a1a" : "transparent",
                  padding: 12,
                  borderRadius: 24,
                }}
              >
                <Ionicons
                  name="home"
                  size={24}
                  color={focused ? "#2196F3" : "#888"}
                />
              </View>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: focused ? "#2196F3" : "#888",
                  fontWeight: focused ? "600" : "400",
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  backgroundColor: focused ? "#1a1a1a" : "transparent",
                  padding: 12,
                  borderRadius: 24,
                }}
              >
                <Ionicons
                  name="search"
                  size={24}
                  color={focused ? "#2196F3" : "#888"}
                />
              </View>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: focused ? "#2196F3" : "#888",
                  fontWeight: focused ? "600" : "400",
                }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View
                style={{
                  backgroundColor: focused ? "#1a1a1a" : "transparent",
                  padding: 12,
                  borderRadius: 24,
                }}
              >
                <Ionicons
                  name="person"
                  size={24}
                  color={focused ? "#2196F3" : "#888"}
                />
              </View>
              <Text
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  color: focused ? "#2196F3" : "#888",
                  fontWeight: focused ? "600" : "400",
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
