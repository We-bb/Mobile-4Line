// lib/nameStore.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "playerName";
const KEY2 = "player2Name";

export async function getSavedName(): Promise<string> {
  return (await AsyncStorage.getItem(KEY)) ?? "";
}

export async function saveName(name: string): Promise<void> {
  await AsyncStorage.setItem(KEY, name.trim());
}
export async function getSavedName2(): Promise<string> {
  return (await AsyncStorage.getItem(KEY2)) ?? "";
}
export async function saveName2(name: string): Promise<void> {
  await AsyncStorage.setItem(KEY2, name.trim());
}
