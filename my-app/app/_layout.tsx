import { Stack } from "expo-router";
import { GlobalSettingsProvider } from "../components/GlobalSettings";

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
