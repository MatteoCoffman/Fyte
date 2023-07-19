import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

const ModalComponent = ({
  selectedFighter,
  setSelectedFighter,
  setShowModal,
  setBetData,
}) => {
  const [betAmount, setBetAmount] = useState("");
  const [winAmount, setWinAmount] = useState("");

  const handleBetAmountChange = (value) => {
    // Validate input (only numbers)
    if (/^\d*$/.test(value)) {
      setBetAmount(value);
      // Calculate win amount based on the selected fighter's odds and entered bet amount
      const odds = selectedFighter?.price;
      if (odds) {
        const win = value * (odds > 0 ? odds / 100 : 100 / -odds);
        setWinAmount(win.toFixed(2));
      }
    }
  };

  const handleWinAmountChange = (value) => {
    // Validate input (only numbers)
    if (/^\d*$/.test(value)) {
      setWinAmount(value);
      // Calculate bet amount based on the selected fighter's odds and entered win amount
      const odds = selectedFighter?.price;
      if (odds) {
        const bet = value / (odds > 0 ? odds / 100 : 100 / -odds);
        setBetAmount(bet.toFixed(2));
      }
    }
  };

  const handleModalSubmit = () => {
    // Save the selected fighter and bet/win amounts
    const newBet = {
      fighter: selectedFighter,
      betAmount,
      winAmount,
    };
    setBetData((prevData) => [...prevData, newBet]);

    // Close the modal and reset the state
    setShowModal(false);
    setSelectedFighter(null);
    setBetAmount("");
    setWinAmount("");
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
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
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleModalSubmit}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
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
