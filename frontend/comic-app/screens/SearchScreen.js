import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const SearchScreen = () => {
  const navigation = useNavigation();
  return (
    React.useEffect(() => {
      navigation.setOptions({
        headerLargeTitle: true,
        headerSearchBarOptions: {
          placeholder: "Tìm kiếm",
        },
      });
    }, [navigation]),
    (
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            margin: 16,
            color: "#808080",
          }}
        >
          SearchScreen
        </Text>
      </View>
    )
  );
};

export default SearchScreen;
