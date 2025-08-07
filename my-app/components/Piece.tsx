import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Cell } from "./Board";

type PieceProps = {
  color: Cell;
  colorBlindMode?: boolean;
};

export default function Piece({ color, colorBlindMode = false }: PieceProps) {
  const emojiMap = {
    red: "🦀",    // crab for red
    orange: "🦊", // fox for orange
  };

  if (colorBlindMode) {
    return (
      <View style={styles.piece}>
        <Text style={styles.emoji}>{color ? emojiMap[color] : ""}</Text>
      </View>
    );
  }

  const backgroundColor =
    color === "red" ? "#d62828" : color === "orange" ? "#fca311" : "#0b1a2b";

  return <View style={[styles.piece, { backgroundColor }]} />;
}

const styles = StyleSheet.create({
  piece: {
    width: 30,
    height: 30,
    borderRadius: 15,
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
