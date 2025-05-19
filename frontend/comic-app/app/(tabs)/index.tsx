import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MangaHomeScreen from '@/screens/MangaHomeScreen';
import CategoryScreen from '@/screens/CategoryScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



export default function HomeScreen() {
  return (
  
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={MangaHomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{ title: "Thể loại" }}
        />
      </Stack.Navigator>
      
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
