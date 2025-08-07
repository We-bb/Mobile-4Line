import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const dummyPlayers = Array.from({ length: 25 }, (_, i) => ({
  name: `Player${i + 1}`,
  wins: Math.floor(Math.random() * 100),
  losses: Math.floor(Math.random() * 100),
}));

export default function LeaderboardScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.push("/")}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Leaderboard</Text>

      <ScrollView style={styles.scroll}>
        {dummyPlayers.map((player, index) => (
          <View key={index} style={styles.playerRow}>
            <Text style={styles.playerText}>
              {index + 1}. {player.name} — Wins: {player.wins}, Losses:{" "}
              {player.losses}
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
