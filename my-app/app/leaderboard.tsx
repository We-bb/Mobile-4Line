import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../components/useThemeColors";
import { watchTopScores } from "../lib/leaderboard";

// Type for leaderboard row
type Row = { id: string; name: string; score: number; createdAt: any };

export default function LeaderboardScreen() {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]); // Leaderboard data
  const colors = useThemeColors();

  // Subscribe to top scores
  useEffect(() => {
    const stop = watchTopScores(setRows, 50); // Watch top 50 scores
    return stop; // Cleanup on unmount
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      {/* Back button */}
      <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
      </TouchableOpacity>

      {/* Screen title */}
      <Text style={[styles.title, { color: colors.text }]}>Leaderboard</Text>

      {/* Scrollable list of players */}
      <ScrollView style={styles.scroll}>
        {rows.map((r, i) => (
          <View key={r.id} style={[styles.playerRow, { backgroundColor: colors.card }]}> 
            <Text style={[styles.playerText, { color: colors.text }]}> 
              {i + 1}. {r.name} — Score: {r.score}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  scroll: {
    width: "90%",
  },
  playerRow: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  playerText: {
    fontSize: 16,
  },
});
