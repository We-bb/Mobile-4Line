import { Stack } from "expo-router";
import { GlobalSettingsProvider } from "../components/GlobalSettings"; // adjust path as needed

export default function RootLayout() {
  return (
    <GlobalSettingsProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GlobalSettingsProvider>
  );
}
