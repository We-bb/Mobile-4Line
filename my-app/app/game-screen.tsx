import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Board, { Cell, createEmptyBoard, findWinningCells } from "../components/Board";
import { useGlobalSettings } from "../components/GlobalSettings";
import { useThemeColors } from "../components/useThemeColors";
import { getBestMove } from "../lib/ai";
import { submitScore } from "../lib/leaderboard";
import { getSavedName } from "../lib/nameStore";

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isAiPlaying = params.ai === "1";
  const submittedRef = useRef(false);
  const colors = useThemeColors();

  function countFilledCells(b: Cell[][]) {
    return b.reduce((acc, row) => acc + row.filter(Boolean).length, 0);
  }

  const { colorBlindMode } = useGlobalSettings();

  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<"red" | "orange">(Math.random() < 0.5 ? "red" : "orange");
  const [winner, setWinner] = useState<"red" | "orange" | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][] | null>(null);

  const humanPlayer = "red";
  const aiPlayer = "orange";

  const handleColumnPress = (colIndex: number) => {
    if (winner) return;
    if (isAiPlaying && currentPlayer !== humanPlayer) return;

    playMove(colIndex, currentPlayer);
  };
  const playMove = (colIndex: number, player: "red" | "orange") => {
    for (let row = board.length - 1; row >= 0; row--) {
      if (!board[row][colIndex]) {
        const newBoard = board.map((r) => [...r]);
        newBoard[row][colIndex] = player;

        const winResult = findWinningCells(newBoard, player);
        if (winResult) {
          setBoard(newBoard);
          setWinner(player);
          setWinningCells(winResult);

          // ↓↓↓ SUBMIT SCORE ONCE
          (async () => {
            if (submittedRef.current) return;
            submittedRef.current = true;

            const name = (await getSavedName()) || "Anonymous";
            const moves = countFilledCells(newBoard); // example metric
            const score = Math.max(1, 100 - moves); // simple “higher is better”
            try {
              await submitScore(name, score);
            } catch (e) {
              console.warn("Failed to submit score:", e);
            }
          })();
        } else {
          setBoard(newBoard);
          setCurrentPlayer((prev) => (prev === "red" ? "orange" : "red"));
        }
        return;
      }
    }
  };

  useEffect(() => {
    if (!isAiPlaying) return;
    if (winner) return;

    if (currentPlayer === aiPlayer) {
      const timeout = setTimeout(() => {
        const aiMove = getBestMove(board, aiPlayer, humanPlayer);
        playMove(aiMove, aiPlayer);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, board, winner, isAiPlaying]);

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(Math.random() < 0.5 ? "red" : "orange");
    setWinner(null);
    setWinningCells(null);
    submittedRef.current = false;
  };

  const returnToModeScreen = () => {
    router.push("/mode");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <TouchableOpacity onPress={returnToModeScreen} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>4Line Mobile</Text>

      <Board
        board={board}
        onColumnPress={handleColumnPress}
        winningCells={winningCells}
        currentPlayer={currentPlayer}
        colorBlindMode={colorBlindMode}
      />

      <Text style={[styles.turnText, { color: colors.text }]}> 
        {winner
          ? `Winner: ${winner === "red" ? "Red 🔴" : "Orange 🟠"}`
          : `${currentPlayer === "red" ? "Red 🔴" : "Orange 🟠"}'s Turn`}
      </Text>

      {winner && (
        <View style={styles.winnerButtons}>
          <TouchableOpacity onPress={resetGame} style={[styles.resetButton, styles.orangeButton]}>
            <Text style={styles.resetText}>🔄 Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={returnToModeScreen}
            style={[styles.resetButton, styles.redButton, { marginTop: 10 }]}
          >
            <Text style={styles.resetText}>🎮 Return to Mode Select</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1a2b",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 28,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  turnText: {
    marginTop: 20,
    fontSize: 18,
    color: "white",
  },
  resetButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 200,
  },
  orangeButton: {
    backgroundColor: "#fca311",
  },
  redButton: {
    backgroundColor: "#dc2f02",
  },
  resetText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  winnerButtons: {
    marginTop: 20,
    alignItems: "center",
  },
});
