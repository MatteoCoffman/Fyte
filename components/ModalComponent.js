import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const ModalComponent = ({
  selectedFighter,
  betAmount,
  winAmount,
  handleBetAmountChange,
  handleWinAmountChange,
  handleModalSubmit,
}) => {
  return (
    <View style={styles.modalContent}>
      <Text style={styles.selectedFighterText}>
        Selected Fighter: {selectedFighter?.name}
      </Text>
      <View style={styles.inputField}>
        <Text>Bet:</Text>
        <TextInput
          value={betAmount}
          onChangeText={handleBetAmountChange}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <View style={styles.inputField}>
        <Text>Win:</Text>
        <TextInput
          value={winAmount}
          onChangeText={handleWinAmountChange}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleModalSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 4,
  },
  selectedFighterText: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 5,
  },
  submitButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ModalComponent;
