import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddBoot from "./components/AddBoot";
import UpdateBoot from "./components/UpdateBoot";
import {
  Boot,
  deleteBootRow,
  fetchBoots,
  initDb,
  insertBoot,
  updateBootRow,
} from "./db";

const App: React.FC = () => {
  const [boots, setBoots] = useState<Boot[]>([]);
  const [addVisible, setAddVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState<Boot | undefined>(undefined);

  const load = async () => {
    await initDb();
    const rows = await fetchBoots();
    setBoots(rows);
  };

  useEffect(() => {
    load();
  }, []);

  const onAdd = async (type: string, size: string) => {
    await insertBoot(type, size);
    const rows = await fetchBoots();
    setBoots(rows);
    setAddVisible(false);
  };

  const onDelete = async (id: number) => {
    await deleteBootRow(id);
    const rows = await fetchBoots();
    setBoots(rows);
  };

  const startUpdate = (boot: Boot) => {
    setSelected(boot);
    setUpdateVisible(true);
  };

  const onSaveUpdate = async (type: string, size: string) => {
    if (!selected) return;
    await updateBootRow(selected.id, type, size);
    const rows = await fetchBoots();
    setBoots(rows);
    setSelected(undefined);
    setUpdateVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setAddVisible(true)}
      >
        <Text style={styles.addBtnText}>ADD BOOT</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Boot list</Text>

      <View style={styles.listWrapper}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.listContent}
        >
          {boots.map((b) => (
            <TouchableOpacity
              key={b.id}
              onLongPress={() => onDelete(b.id)}
              onPress={() => startUpdate(b)}
            >
              <View style={styles.listItem}>
                <Text>
                  {b.id}: {b.type} / {b.size}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <AddBoot
        visible={addVisible}
        onAdd={onAdd}
        onCancel={() => setAddVisible(false)}
      />

      <UpdateBoot
        visible={updateVisible}
        boot={selected}
        onSave={onSaveUpdate}
        onCancel={() => {
          setSelected(undefined);
          setUpdateVisible(false);
        }}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 24,
    backgroundColor: "#fff",
  },
  addBtn: {
    backgroundColor: "#1976D2",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
    elevation: 2,
  },
  addBtnText: { color: "#fff", fontWeight: "700", letterSpacing: 0.5 },
  title: { marginVertical: 8, fontSize: 16, color: "#666" },
  listWrapper: {
    width: "92%",
    backgroundColor: "#FFFB00",
    borderRadius: 4,
    paddingVertical: 8,
  },
  scroll: { width: "100%" },
  listContent: { paddingHorizontal: 8, paddingBottom: 24 },
  listItem: {
    backgroundColor: "#7CFC00",
    borderWidth: 3,
    borderColor: "#FF0000",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 4,
  },
});
