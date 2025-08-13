// app/leaderboard.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../components/useThemeColors";
import { watchTopScores } from "../lib/leaderboard";
type Row = { id: string; name: string; score: number; createdAt: any };

export default function LeaderboardScreen() {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const colors = useThemeColors();

  useEffect(() => {
    const stop = watchTopScores(setRows, 50);
    return stop;
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.text }]}>Leaderboard</Text>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1a2b",
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
    color: "white",
    fontSize: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  scroll: {
    width: "90%",
  },
  playerRow: {
    backgroundColor: "#2c2f45",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  playerText: {
    color: "white",
    fontSize: 16,
  },
});
