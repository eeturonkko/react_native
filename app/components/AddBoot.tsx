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
  onAdd: (id: string, type: string) => void;
  onClose: () => void;
};

const AddBoot: React.FC<Props> = ({ visible, onAdd, onClose }) => {
  const [id, setId] = useState("");
  const [type, setType] = useState("");

  const handleOk = () => {
    onAdd(id, type);
    setId("");
    setType("");
  };

  const handleCancel = () => {
    setId("");
    setType("");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.header}>Add boot</Text>

          <View style={styles.field}>
            <Text style={styles.label}>ID</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 5001"
              value={id}
              onChangeText={setId}
              keyboardType={Platform.select({
                ios: "number-pad",
                android: "numeric",
              })}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Type</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Winter boot"
              value={type}
              onChangeText={setType}
            />
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.btn, styles.gray]}
              onPress={handleCancel}
            >
              <Text style={styles.btnText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.blue]}
              onPress={handleOk}
            >
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.dark]}
              onPress={onClose}
            >
              <Text style={styles.btnText}>CLOSE</Text>
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
  dark: { backgroundColor: "#455A64" },
  btnText: { color: "#fff", fontWeight: "700" },
});
