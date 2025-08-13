import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useThemeColors } from "../components/useThemeColors";

export default function ModeSelect() {
  const router = useRouter();
  const colors = useThemeColors(); // Theme colors

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      {/* Back button */}
      <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
        <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
      </TouchableOpacity>

      {/* Screen title */}
      <Text style={[styles.title, { color: colors.text }]}>4Line Mobile</Text>
      <Text style={[styles.subtitle, { color: colors.text }]}>Select Game Mode</Text>

      {/* Pass-and-Play mode */}
      <TouchableOpacity
        style={[styles.button, styles.orangeButton]}
        onPress={() => router.push("/game-screen")}
      >
        <Text style={styles.buttonText}>🤝 Pass and Play</Text>
      </TouchableOpacity>

      {/* VS AI mode */}
      <TouchableOpacity
        style={[styles.button, styles.redButton]}
        onPress={() => router.push("/game-screen?ai=1")}
      >
        <Text style={styles.buttonText}>🤖 VS AI</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    minWidth: 200,
  },
  orangeButton: {
    backgroundColor: "#fca311",
  },
  redButton: {
    backgroundColor: "#d62828",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
