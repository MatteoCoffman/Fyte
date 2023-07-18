import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { API_KEY } from "@env";
import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-elements";
import ModalComponent from "../components/ModalComponent";
import OutcomeButton from "../components/OutcomeButton";

const MainScreen = () => {
  const [odds, setOdds] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBookmaker, setSelectedBookmaker] = useState(null);
  const [selectedFighter, setSelectedFighter] = useState(null);
  const [betAmount, setBetAmount] = useState("");
  const [winAmount, setWinAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [betData, setBetData] = useState([]);

  const handleFighterSelection = (fighter) => {
    setSelectedFighter(fighter);
    setBetAmount("");
    setWinAmount("");
    setShowModal(true);
  };

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

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const sportsResponse = await fetch(
          `https://api.the-odds-api.com/v4/sports?apiKey=${API_KEY}`
        );
        const sportsData = await sportsResponse.json();

        const mma = sportsData.find(
          (sport) => sport.key === "mma_mixed_martial_arts"
        );
        if (!mma) {
          console.error("MMA not found");
          return;
        }

        const oddsResponse = await fetch(
          `https://api.the-odds-api.com/v4/sports/${mma.key}/odds?regions=us&oddsFormat=american&apiKey=${API_KEY}`
        );
        const oddsData = await oddsResponse.json();

        setOdds(oddsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOdds();
  }, [selectedBookmaker]);

  const bookmakers = Array.from(
    new Set(
      odds.flatMap((game) =>
        game.bookmakers.map((bookmaker) => bookmaker.title)
      )
    )
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Picker
          selectedValue={selectedBookmaker}
          onValueChange={(itemValue) => setSelectedBookmaker(itemValue)}
        >
          <Picker.Item label="Select bookmaker" value="" />
          {bookmakers.map((bookmaker, index) => (
            <Picker.Item key={index} label={bookmaker} value={bookmaker} />
          ))}
        </Picker>
        {odds.map((game, index) => (
          <View key={index} style={styles.game}>
            <Text>
              {game.home_team} vs {game.away_team}
            </Text>
            {game.bookmakers
              .filter(
                (bookmaker) =>
                  bookmaker.title === selectedBookmaker ||
                  selectedBookmaker === ""
              )
              .map((bookmaker, index) => (
                <View key={index} style={styles.bookmaker}>
                  <Text>Bookmaker: {bookmaker.title}</Text>
                  {bookmaker.markets.map((market, index) => (
                    <View key={index} style={styles.market}>
                      {market.outcomes.map((outcome, index) => (
                        <OutcomeButton
                          key={index}
                          outcome={outcome}
                          handleFighterSelection={handleFighterSelection}
                        />
                      ))}
                    </View>
                  ))}
                </View>
              ))}
          </View>
        ))}
        <Modal visible={showModal} transparent animationType="slide">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <ModalComponent
            selectedFighter={selectedFighter}
            betAmount={betAmount}
            winAmount={winAmount}
            handleBetAmountChange={handleBetAmountChange}
            handleWinAmountChange={handleWinAmountChange}
            handleModalSubmit={handleModalSubmit}
          />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    paddingBottom: 0,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  game: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  bookmaker: {
    marginLeft: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#e9e9e9",
  },
  market: {
    marginLeft: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#d9d9d9",
  },
  outcomeButton: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
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

export default MainScreen;
