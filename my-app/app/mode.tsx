import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ModeSelect() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.push("/")} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>4Line Mobile</Text>
      <Text style={styles.subtitle}>Select Game Mode</Text>

      <TouchableOpacity
        style={[styles.button, styles.orangeButton]}
        onPress={() => router.push("/game-screen")}
      >
        <Text style={styles.buttonText}>🤝 Pass and Play</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.redButton]}
        onPress={() => router.push("/game-screen?ai=1")}
      >
        <Text style={styles.buttonText}>🤖 VS AI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1a2b",
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
    color: "white",
    fontSize: 28,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 4,
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
