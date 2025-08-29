import React, { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onAdd: (type: string, size: string) => void;
  onCancel: () => void;
};

const AddBoot: React.FC<Props> = ({ visible, onAdd, onCancel }) => {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");

  const ok = () => {
    const t = type.trim();
    const s = size.trim();
    if (!t || !s) return;
    onAdd(t, s);
    setType("");
    setSize("");
  };

  const cancel = () => {
    setType("");
    setSize("");
    onCancel();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.header}>Add boot</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Type</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Winter boot"
              value={type}
              onChangeText={setType}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Size</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 47"
              value={size}
              onChangeText={setSize}
              keyboardType={Platform.select({
                ios: "number-pad",
                android: "numeric",
              })}
            />
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.btn, styles.gray]}
              onPress={cancel}
            >
              <Text style={styles.btnText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.blue]} onPress={ok}>
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddBoot;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  header: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  field: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: "600", marginBottom: 6 },
  input: {
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#bfe7f0",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    marginHorizontal: 4,
  },
  blue: { backgroundColor: "#1976D2" },
  gray: { backgroundColor: "#9E9E9E" },
  btnText: { color: "#fff", fontWeight: "700" },
});
