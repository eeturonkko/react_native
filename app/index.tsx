import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type BootItem = { id: string; type: string; size: string };

export default function App() {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [items, setItems] = useState<BootItem[]>([]);

  const handleOk = () => {
    const t = type.trim();
    const s = size.trim();
    if (!t && !s) return;
    setItems((prev) => [
      ...prev,
      { id: `${Date.now()}`, type: t || "—", size: s || "—" },
    ]);
  };

  const handleCancel = () => {
    setType("");
    setSize("");
  };

  const renderItem = ({ item, index }: { item: BootItem; index: number }) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>
        {index + 1}: {item.type} / {item.size}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.inputLeft]}
          placeholder="Boot type (e.g., Leather boot)"
          value={type}
          onChangeText={setType}
        />
        <TextInput
          style={[styles.input, styles.inputRight]}
          placeholder="Size (e.g., 47)"
          value={size}
          onChangeText={setSize}
          keyboardType="number-pad"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.btn, styles.btnCancel]}
          onPress={handleCancel}
        >
          <Text style={styles.btnText}>CANCEL</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnOk]} onPress={handleOk}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.listTitle}>List of Boots</Text>

      <FlatList
        style={styles.list}
        data={items}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  inputRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 12,
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
  inputRight: { marginLeft: 10 },
  buttonRow: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  btn: {
    minWidth: 130,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
    elevation: 2,
  },
  btnCancel: { backgroundColor: "#1976D2" },
  btnOk: { backgroundColor: "#1976D2" },
  btnText: { color: "#fff", fontWeight: "700", letterSpacing: 0.5 },
  listTitle: {
    marginTop: 6,
    marginBottom: 6,
    fontSize: 16,
    color: "#666",
  },
  list: {
    width: "92%",
  },
  listItem: {
    borderWidth: 3,
    borderColor: "blackr",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 4,
  },
  listText: {
    fontSize: 16,
    color: "#111",
  },
});
