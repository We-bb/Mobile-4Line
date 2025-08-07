import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type ModeSelectorProps = {
  onSelectMode: (mode: "pass-and-play" | "vs-ai") => void;
};

export default function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Game Mode</Text>

      <TouchableOpacity
        style={[styles.button, styles.passButton]}
        onPress={() => onSelectMode("pass-and-play")}
      >
        <Text style={styles.buttonText}>Pass and Play</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.aiButton]}
        onPress={() => onSelectMode("vs-ai")}
      >
        <Text style={styles.buttonText}>Play vs AI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1a2b",
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
    backgroundColor: "#fca311",
  },
  aiButton: {
    backgroundColor: "#d62828",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
