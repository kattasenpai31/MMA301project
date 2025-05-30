// app/_layout.jsx

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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/login" options={{ title: "Đăng nhập" }} />
        <Stack.Screen name="(auth)/register" options={{ title: "Đăng ký" }} />
        <Stack.Screen
          name="(auth)/forgot-password"
          options={{ title: "Quên mật khẩu" }}
        />
        <Stack.Screen
          name="mangas/[id]"
          options={{ title: "Chi tiết Manga", presentation: "card" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
