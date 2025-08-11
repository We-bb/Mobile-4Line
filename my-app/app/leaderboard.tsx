// app/leaderboard.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { watchTopScores } from "../lib/leaderboard";

type Row = { id: string; name: string; score: number; createdAt: any };

export default function LeaderboardScreen() {
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const stop = watchTopScores(setRows, 50);
    return stop;
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Leaderboard</Text>

      <ScrollView style={styles.scroll}>
        {rows.map((r, i) => (
          <View key={r.id} style={styles.playerRow}>
            <Text style={styles.playerText}>
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
