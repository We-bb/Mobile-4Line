import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Type for team
type Team = "red" | "orange" | null;

// Props for TeamSelector
type TeamSelectorProps = {
  selected: Team; // currently selected team
  onSelectTeam: (team: Team) => void; // callback when user selects a team
};

// Component for choosing a team
export default function TeamSelector({ selected, onSelectTeam }: TeamSelectorProps) {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Choose Your Team</Text>

      {/* Team buttons */}
      <View style={styles.teamButtons}>
        {/* Orange Team button */}
        <TouchableOpacity
          disabled={selected !== null} // disable if a team is already selected
          style={[
            styles.teamButton,
            styles.orangeButton,
            selected === "orange" && styles.selected, // highlight if selected
          ]}
          onPress={() => onSelectTeam("orange")}
        >
          <Text style={styles.buttonText}>Orange Team</Text>
        </TouchableOpacity>

        {/* Red Team button */}
        <TouchableOpacity
          disabled={selected !== null} // disable if a team is already selected
          style={[
            styles.teamButton,
            styles.redButton,
            selected === "red" && styles.selected, // highlight if selected
          ]}
          onPress={() => onSelectTeam("red")}
        >
          <Text style={styles.buttonText}>Red Team</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles for TeamSelector
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0b1a2b",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 40,
    fontWeight: "bold",
  },
  teamButtons: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    justifyContent: "space-around",
  },
  teamButton: {
    flex: 1,
    borderRadius: 25,
    paddingVertical: 15,
    marginHorizontal: 10,
    alignItems: "center",
  },
  orangeButton: {
    backgroundColor: "#fca311",
  },
  redButton: {
    backgroundColor: "#d62828",
  },
  selected: {
    borderWidth: 3,
    borderColor: "white", // highlight border when selected
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
