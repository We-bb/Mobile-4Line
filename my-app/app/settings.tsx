import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGlobalSettings } from "../components/GlobalSettings";
import { useThemeColors } from "../components/useThemeColors";



export default function SettingsScreen() {
  const router = useRouter();
  const { colorBlindMode, setColorBlindMode } = useGlobalSettings();
  const { themeSetter, setThemeSetter } = useGlobalSettings();
  const colors = useThemeColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}> 
      <View style={styles.titleRow}>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.backButton}
        >
          <Text style={[styles.backButtonText, { color: colors.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={[styles.settingRow, { backgroundColor: colors.card, borderBottomColor: colors.border }]}> 
          <Text style={[styles.label, { color: colors.text }]}>Color Blind Mode</Text>
          <Switch value={colorBlindMode} onValueChange={setColorBlindMode}  />
        </View>

        <View style={[styles.settingRow, { backgroundColor: colors.card, borderBottomColor: colors.border }]}> 
          <Text style={[styles.label, { color: colors.text }]}>Theme</Text>
          <Switch
            value={themeSetter}
            onValueChange={setThemeSetter}
            thumbColor={themeSetter ? "#fff" : "#222"}
            trackColor={{ false: colors.border, true: colors.accent }}
          />
        </View>

        <View style={[styles.rulesBox, { backgroundColor: colors.card }]}> 
          <Text style={[styles.rulesTitle, { color: colors.accent }]}>📜 Game Rules</Text>
          <Text style={[styles.rulesText, { color: colors.text }]}> 
            • Take turns dropping a token into one of 7 columns.{"\n"}
            • First to connect 4 tokens in a row (vertically, horizontally, or diagonally) wins.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1a2b",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  scroll: {
    width: "100%",
  },
  settingRow: {
    backgroundColor: "#2c2f45",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: "white",
    fontSize: 16,
  },
  rulesBox: {
    backgroundColor: "#2c2f45",
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
  },
  rulesTitle: {
    color: "#fca311",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rulesText: {
    color: "white",
    fontSize: 14,
    lineHeight: 20,
  },
});
