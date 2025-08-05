import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { View, Text } from "react-native";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // If user is authenticated, redirect to tabs
  if (isAuthenticated) {
    return <Redirect href="/(auth)" />;
  }

  // If not authenticated, redirect to auth
  return <Redirect href="/(auth)" />;
}



