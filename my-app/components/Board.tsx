import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Piece from "./Piece";
import { useGlobalSettings } from "./GlobalSettings";

export type Cell = "red" | "orange" | null;

const SAFE_BLUE = "#0072B2";
const SAFE_ORANGE = "#E69F00";

function Token({ owner }: { owner: "red" | "orange" }) {
  const { colorBlindMode } = useGlobalSettings();

  const color = colorBlindMode
    ? owner === "red"
      ? SAFE_BLUE
      : SAFE_ORANGE
    : owner === "red"
    ? "#dc2f02"
    : "#fca311";

  // Optional: symbol overlay to differentiate
  const symbol = colorBlindMode ? (owner === "red" ? "▲" : "●") : "";

  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: colorBlindMode ? 2 : 0,
        borderColor: "#00000055",
      }}
    >
      {colorBlindMode ? (
        <Text style={{ color: "white", fontWeight: "900" }}>{symbol}</Text>
      ) : null}
    </View>
  );
}

interface BoardProps {
  board: Cell[][];
  onColumnPress: (colIndex: number) => void;
  currentPlayer: "red" | "orange";
  winningCells: [number, number][] | null;
  colorBlindMode: boolean;
}

export function createEmptyBoard(): Cell[][] {
  return Array.from({ length: 6 }, () => Array(7).fill(null));
}

export function findWinningCells(
  board: Cell[][],
  player: "red" | "orange"
): [number, number][] | null {
  const height = board.length;
  const width = board[0].length;

  const directions = [
    [0, 1], // horizontal right
    [1, 0], // vertical down
    [1, 1], // diagonal down-right
    [-1, 1], // diagonal up-right
  ];

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (board[r][c] !== player) continue;

      for (const [dr, dc] of directions) {
        const cells: [number, number][] = [[r, c]];
        for (let i = 1; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;

          if (
            nr < 0 ||
            nr >= height ||
            nc < 0 ||
            nc >= width ||
            board[nr][nc] !== player
          ) {
            break;
          }
          cells.push([nr, nc]);
        }
        if (cells.length === 4) {
          return cells;
        }
      }
    }
  }

  return null;
}

export default function Board({
  board,
  onColumnPress,
  currentPlayer,
  winningCells,
  colorBlindMode,
}: BoardProps) {
  return (
    <View style={styles.wrapper}>
      {/* Selector Row */}
      <View style={styles.selectorRow}>
        {board[0].map((_, colIndex) => (
          <TouchableOpacity key={colIndex} onPress={() => onColumnPress(colIndex)}>
            <View
              style={[styles.selectorCircle, { backgroundColor: currentPlayer }]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Game Board */}
      <View style={styles.board}>
        {board.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.boardRow}>
            {row.map((cell, colIdx) => {
              const isWinning =
                winningCells?.some(([r, c]) => r === rowIdx && c === colIdx) ??
                false;

              return (
                <View
                  key={colIdx}
                  style={[
                    styles.cell,
                    isWinning && styles.winningCell, // apply prominent style if winning
                  ]}
                >
                  <Piece color={cell} colorBlindMode={colorBlindMode} />
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const CIRCLE_SIZE = 30;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },
  selectorRow: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 8,
  },
  selectorCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    opacity: 0.6,
  },
  board: {
    backgroundColor: "#2c2f45",
    padding: 10,
    borderRadius: 20,
  },
  boardRow: {
    flexDirection: "row",
  },
  cell: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible", // allow glow
  },
  winningCell: {
    borderColor: "#FFD700", // bright gold
    borderWidth: 4, // thicker border
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    elevation: 8, // Android shadow
  },
});
