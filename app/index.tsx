import React from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput style={styles.input} placeholder="Input 1" />
        <TextInput style={styles.input} placeholder="Input 2" />
      </View>

      <View style={styles.buttonRow}>
        <Button title="OK" onPress={() => {}} />
        <Button title="Cancel" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 10,
  },
});
