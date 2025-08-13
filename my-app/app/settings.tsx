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
  const { colorBlindMode, setColorBlindMode, themeSetter, setThemeSetter } =
    useGlobalSettings(); // Global settings state
  const colors = useThemeColors(); // Theme colors

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with back button */}
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
        {/* Color Blind Mode toggle */}
        <View
          style={[
            styles.settingRow,
            { backgroundColor: colors.card, borderBottomColor: colors.border },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>Color Blind Mode</Text>
          <Switch
            value={colorBlindMode}
            onValueChange={setColorBlindMode}
            thumbColor={colorBlindMode ? "#fff" : "#222"}
            trackColor={{ false: colors.border, true: colors.accent }}
          />
        </View>

        {/* Dark Mode toggle */}
        <View
          style={[
            styles.settingRow,
            { backgroundColor: colors.card, borderBottomColor: colors.border },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={themeSetter}
            onValueChange={setThemeSetter}
            thumbColor={themeSetter ? "#fff" : "#222"}
            trackColor={{ false: colors.border, true: colors.accent }}
          />
        </View>

        {/* Game Rules */}
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  scroll: {
    width: "100%",
  },
  settingRow: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
  },
  rulesBox: {
    borderRadius: 12,
    padding: 20,
    marginTop: 10,
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rulesText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
