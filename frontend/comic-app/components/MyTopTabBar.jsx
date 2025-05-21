import React from "react";
import { Animated, View, TouchableOpacity, Text, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";

const MyTopTabBar = ({ state, descriptors, navigation, position }) => {
  const { colors } = useTheme();

  return (
    <View style={{ flexDirection: "row", backgroundColor: "black" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position
          ? position.interpolate({
              inputRange,
              outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
            })
          : 1;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole={Platform.OS === "web" ? "link" : "button"}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              paddingVertical: 10,
              alignItems: "center",
              backgroundColor: "black",
            }}
          >
            <Animated.Text
              style={{
                opacity,
                color: "white", // text màu trắng
                fontWeight: isFocused ? "bold" : "normal",
              }}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTopTabBar;
