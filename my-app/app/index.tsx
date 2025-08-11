import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Link } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { getSavedName, saveName } from "../lib/nameStore";

export default function HomeScreen() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => setName(await getSavedName()))();
  }, []);
  const handlePlayPress = async () => {
    const n = name.trim();
    if (!n) return Alert.alert("Enter a name first");
    await saveName(n);
    // Link below will navigate; saving here ensures it's persisted
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>4Line Mobile</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name..."
        placeholderTextColor="#aaa"
        style={styles.input}
        maxLength={20}
      />

      {/* 👇 UPDATED LINK to go to mode select screen */}
      <Link href="/mode" asChild>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
          <Text style={styles.playText}>▶ Play</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/leaderboard" asChild>
        <TouchableOpacity style={styles.leaderboardButton}>
          <Text style={styles.leaderboardText}>🏆 Leaderboards</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/settings" asChild>
        <TouchableOpacity>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </Link>

      <Text style={styles.footer}>A strategic puzzle game by Team FYC Dev.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1a2b",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: "#fca311",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
  },
  playText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  leaderboardButton: {
    backgroundColor: "#d62828",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 30,
  },
  leaderboardText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  settingsIcon: {
    fontSize: 30,
    marginBottom: 40,
    color: "white",
  },
  footer: {
    color: "#ccc",
    position: "absolute",
    bottom: 20,
    fontSize: 12,
  },
});
