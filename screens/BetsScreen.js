import React from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";

const BetsScreen = ({ betData }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Active Bets</Text>
      <ScrollView>
        {betData.map((bet, index) => (
          <View key={index} style={styles.betItem}>
            <Text>Fighter: {bet.fighter.name}</Text>
            <Text>Bet Amount: {bet.betAmount}</Text>
            <Text>Win Amount: {bet.winAmount}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  betItem: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
});

export default BetsScreen;
