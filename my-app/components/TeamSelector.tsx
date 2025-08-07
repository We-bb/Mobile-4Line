import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Team = "red" | "orange" | null;

type TeamSelectorProps = {
  selected: Team;
  onSelectTeam: (team: Team) => void;
};

export default function TeamSelector({ selected, onSelectTeam }: TeamSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Team</Text>

      <View style={styles.teamButtons}>
        <TouchableOpacity
          disabled={selected !== null}
          style={[
            styles.teamButton,
            styles.orangeButton,
            selected === "orange" && styles.selected,
          ]}
          onPress={() => onSelectTeam("orange")}
        >
          <Text style={styles.buttonText}>Orange Team</Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={selected !== null}
          style={[
            styles.teamButton,
            styles.redButton,
            selected === "red" && styles.selected,
          ]}
          onPress={() => onSelectTeam("red")}
        >
          <Text style={styles.buttonText}>Red Team</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
    borderColor: "white",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
