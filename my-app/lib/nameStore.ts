// lib/nameStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "playerName";

export async function getSavedName(): Promise<string> {
  return (await AsyncStorage.getItem(KEY)) ?? "";
}

export async function saveName(name: string): Promise<void> {
  await AsyncStorage.setItem(KEY, name.trim());
}
