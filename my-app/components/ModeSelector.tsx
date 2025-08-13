import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Props for ModeSelector
type ModeSelectorProps = {
  onSelectMode: (mode: "pass-and-play" | "vs-ai") => void; // callback to handle mode selection
};

// ModeSelector component: lets the user choose game mode
export default function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Choose Game Mode</Text>

      {/* Pass-and-Play button */}
      <TouchableOpacity
        style={[styles.button, styles.passButton]}
        onPress={() => onSelectMode("pass-and-play")}
      >
        <Text style={styles.buttonText}>Pass and Play</Text>
      </TouchableOpacity>

      {/* VS AI button */}
      <TouchableOpacity
        style={[styles.button, styles.aiButton]}
        onPress={() => onSelectMode("vs-ai")}
      >
        <Text style={styles.buttonText}>Play vs AI</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for ModeSelector
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1a2b", // dark background
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 40,
    fontWeight: "bold",
  },
  button: {
    width: 220,
    padding: 15,
    borderRadius: 30,
    marginVertical: 15,
    alignItems: "center",
  },
  passButton: {
    backgroundColor: "#fca311", // orange
  },
  aiButton: {
    backgroundColor: "#d62828", // red
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
