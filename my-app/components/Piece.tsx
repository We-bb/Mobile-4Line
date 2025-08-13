import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Cell } from "./Board";

// Props for a single board piece
type PieceProps = {
  color: Cell; // "red", "orange", or null
  colorBlindMode?: boolean; // whether to use color-blind friendly symbols
};

// Component representing a single game piece
export default function Piece({ color, colorBlindMode = false }: PieceProps) {
  // Emoji symbols for color-blind mode
  const emojiMap = {
    red: "🦀",    // crab for red
    orange: "🦊", // fox for orange
  };

  if (colorBlindMode) {
    // Render emoji symbol if color-blind mode is active
    return (
      <View style={styles.piece}>
        <Text style={styles.emoji}>{color ? emojiMap[color] : ""}</Text>
      </View>
    );
  }

  // Regular colored circle for normal mode
  const backgroundColor =
    color === "red" ? "#d62828" : color === "orange" ? "#fca311" : "#0b1a2b";

  return <View style={[styles.piece, { backgroundColor }]} />;
}

// Styles for piece
const styles = StyleSheet.create({
  piece: {
    width: 30,
    height: 30,
    borderRadius: 15, // circle
    margin: 5,
    borderWidth: 2,
    borderColor: "#222",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 20,
  },
});
