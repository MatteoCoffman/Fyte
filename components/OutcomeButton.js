import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const OutcomeButton = ({ outcome, handleFighterSelection }) => {
  return (
    <TouchableOpacity
      style={styles.outcomeButton}
      onPress={() => handleFighterSelection(outcome)}
    >
      <Text>
        {outcome.name}: {outcome.price}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outcomeButton: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
});

export default OutcomeButton;
