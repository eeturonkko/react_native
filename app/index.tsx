import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type FishItem = { id: string; name: string };

export default function App() {
  const [text, setText] = useState("");
  const [fish, setFish] = useState<FishItem[]>([
    { id: "1", name: "Pike" },
    { id: "2", name: "Pike-perch" },
    { id: "3", name: "Perch" },
    { id: "4", name: "Vendace" },
  ]);

  const addFish = () => {
    const t = text.trim();
    if (!t) return;
    setFish((prev) => [...prev, { id: `${Date.now()}`, name: t }]);
    setText("");
  };

  const removeFish = (id: string) => {
    setFish((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TextInput
          style={[styles.input, styles.inputLeft]}
          placeholder="Add fish (e.g., Bronze bream)"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.okBtn} onPress={addFish}>
          <Text style={styles.okBtnText}>OK</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>List of fish</Text>

      <View style={styles.listWrapper}>
        <ScrollView contentContainerStyle={styles.listContent}>
          {fish.length === 0 && (
            <Text style={styles.listText}>No fish added yet.</Text>
          )}
          {fish.map((item, idx) => (
            <TouchableOpacity
              key={item.id}
              onLongPress={() => removeFish(item.id)}
              activeOpacity={0.7}
              style={styles.listItem}
            >
              <Text style={styles.listText}>
                {idx + 1}: {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    width: "92%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#bfe7f0",
  },
  inputLeft: { marginRight: 10 },
  okBtn: {
    backgroundColor: "#1976D2",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 4,
    elevation: 2,
  },
  okBtnText: { color: "#fff", fontWeight: "700", letterSpacing: 0.5 },
  title: {
    marginVertical: 6,
    fontSize: 16,
    color: "#666",
  },
  listWrapper: {
    width: "92%",
    borderRadius: 4,
    paddingVertical: 8,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 24,
  },
  listItem: {
    borderWidth: 3,
    borderColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 4,
  },
  listText: {
    fontSize: 16,
    color: "#116611",
    fontWeight: "600",
  },
});
