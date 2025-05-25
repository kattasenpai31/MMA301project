import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(BotTabs)" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ title: "Tìm kiếm" }} />
        <Stack.Screen name="login" options={{ title: "Đăng nhập" }} />
        <Stack.Screen name="register" options={{ title: "Đăng ký" }} />
        <Stack.Screen
          name="forgotPassword"
          options={{ title: "Quên mật khẩu" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
