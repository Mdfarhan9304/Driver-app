import { Stack, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { FontProvider } from "../contexts/FontContext";

export default function RootLayout() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);

  useEffect(() => {
    checkFirstLaunch();
  }, []);

  const checkFirstLaunch = async () => {
    // For now, we'll set it to false to skip onboarding
    // Later you can implement AsyncStorage check
    setIsFirstLaunch(false);
  };

  if (isFirstLaunch === null) {
    return null; // Still loading
  }

  if (isFirstLaunch) {
    return <Redirect href="/(onboarding)" />;
  }

  return (
    <FontProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </FontProvider>
  );
}
