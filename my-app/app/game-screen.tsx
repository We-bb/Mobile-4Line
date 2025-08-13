import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, TextInput } from "react-native";
import Board, { Cell, createEmptyBoard, findWinningCells } from "../components/Board";
import { useGlobalSettings } from "../components/GlobalSettings";
import { useThemeColors } from "../components/useThemeColors";
import { getBestMove } from "../lib/ai";
import { submitScore } from "../lib/leaderboard";
import { getSavedName, getSavedName2, saveName, saveName2 } from "../lib/nameStore";

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isAiPlaying = params.ai === "1";
  const submittedRef = useRef(false); // To prevent double score submission
  const colors = useThemeColors();

  // Player name state
  const [redName, setRedName] = useState("");
  const [orangeName, setOrangeName] = useState("");
  const [showNamesModal, setShowNamesModal] = useState(false);

  const { colorBlindMode } = useGlobalSettings();

  // Game state
  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<"red" | "orange">(Math.random() < 0.5 ? "red" : "orange");
  const [winner, setWinner] = useState<"red" | "orange" | null>(null);
  const [winningCells, setWinningCells] = useState<[number, number][] | null>(null);

  const humanPlayer = "red";
  const aiPlayer = "orange";

  // Count filled cells for scoring
  function countFilledCells(b: Cell[][]) {
    return b.reduce((acc, row) => acc + row.filter(Boolean).length, 0);
  }

  // Load saved player names
  useEffect(() => {
    (async () => {
      const n1 = (await getSavedName()) || "";
      const n2 = (await getSavedName2()) || "";
      setRedName(n1);
      setOrangeName(isAiPlaying ? "AI" : n2);
      if (!isAiPlaying) setShowNamesModal(true); // Always prompt in pass-and-play
    })();
  }, [isAiPlaying]);

  // Handle player tapping a column
  const handleColumnPress = (colIndex: number) => {
    if (winner) return;
    if (isAiPlaying && currentPlayer !== humanPlayer) return;
    playMove(colIndex, currentPlayer);
  };

  // Play a move for a player
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

          // Submit score once
          (async () => {
            if (submittedRef.current) return;
            submittedRef.current = true;

            const moves = countFilledCells(newBoard);
            const score = Math.max(1, 100 - moves);
            const winnerName = player === "red" ? redName || "Red" : orangeName || (isAiPlaying ? "AI" : "Orange");

            try {
              await submitScore(winnerName, score);
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

  // AI move effect
  useEffect(() => {
    if (!isAiPlaying || winner) return;

    if (currentPlayer === aiPlayer) {
      const timeout = setTimeout(() => {
        const aiMove = getBestMove(board, aiPlayer, humanPlayer);
        playMove(aiMove, aiPlayer);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentPlayer, board, winner, isAiPlaying]);

  // Reset the game
  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(Math.random() < 0.5 ? "red" : "orange");
    setWinner(null);
    setWinningCells(null);
    submittedRef.current = false;
  };

  const returnToModeScreen = () => router.push("/mode");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Pass-and-play names modal */}
      {!isAiPlaying && (
        <Modal visible={showNamesModal} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Players</Text>

              <TextInput
                value={redName}
                onChangeText={setRedName}
                placeholder="Player 1 name"
                placeholderTextColor={colors.placeholder}
                style={[styles.modalInput, { color: colors.text, backgroundColor: colors.background }]}
                maxLength={20}
              />

              <TextInput
                value={orangeName}
                onChangeText={setOrangeName}
                placeholder="Player 2 name"
                placeholderTextColor={colors.placeholder}
                style={[styles.modalInput, { color: colors.text, backgroundColor: colors.background }]}
                maxLength={20}
              />

              <TouchableOpacity
                style={styles.modalButton}
                onPress={async () => {
                  const n1 = redName.trim();
                  const n2 = orangeName.trim();
                  if (!n1 || !n2) return;
                  await saveName(n1);
                  await saveName2(n2);
                  setShowNamesModal(false);
                }}
              >
                <Text style={styles.modalButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Back button */}
      <TouchableOpacity onPress={returnToModeScreen} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>4Line Mobile</Text>

      {/* Game board */}
      <Board
        board={board}
        onColumnPress={handleColumnPress}
        winningCells={winningCells}
        currentPlayer={currentPlayer}
        colorBlindMode={colorBlindMode}
      />

      {/* Display turn or winner */}
      <Text style={[styles.turnText, { color: colors.text }]}>
        {winner
          ? `Winner: ${
              winner === "red" ? `${redName || "Red"} 🔴` : `${orangeName || (isAiPlaying ? "AI" : "Orange")} 🟠`
            }`
          : `${currentPlayer === "red" ? `${redName || "Red"} 🔴` : `${orangeName || (isAiPlaying ? "AI" : "Orange")} 🟠`}'s Turn`}
      </Text>

      {/* Winner buttons */}
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  turnText: {
    marginTop: 20,
    fontSize: 18,
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
  modalBackdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalCard: {
    width: "85%",
    borderRadius: 16,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "#fca311",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
