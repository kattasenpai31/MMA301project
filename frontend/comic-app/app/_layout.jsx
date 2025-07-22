import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import {
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <UserProvider>
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
          <Stack.Screen
            name="mangas/category/[id]"
            options={{ title: "Manga theo thể loại", presentation: "card" }}
          />
          <Stack.Screen
            name="mangas/description/[id]"
            options={{ title: "Chi tiết", presentation: "card" }}
          />
          <Stack.Screen
            name="/change-password"
            options={{ title: "Đổi Mật khẩu ở profile" }}
          />
          <Stack.Screen
            name="all_recent"
            options={{ title: "Cập nhật gần đây" }}
          />
          <Stack.Screen name="comment" options={{ title: "Bình luận" }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </UserProvider>
  );
}
