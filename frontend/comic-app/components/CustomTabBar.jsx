import { TouchableOpacity, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";

const CustomTabBar = (props) => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* Render mặc định các tab */}
      <View style={{ flex: 1 }}>
        <MaterialTopTabBar {...props} />
      </View>

      {/* Icon search ngoài tab */}
      <TouchableOpacity
        onPress={() => navigation.navigate("search")}
        style={{ paddingHorizontal: 16, justifyContent: "center" }}
      >
        <Ionicons name="search" size={22} color="black" />
      </TouchableOpacity>
    </View>
  );
};
