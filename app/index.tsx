import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AddBoot from "./components/AddBoot";
import UpdateBoot from "./components/UpdateBoot";

type Boot = { id: string; type: string };

const App: React.FC = () => {
  const [bootList, setBootList] = useState<Boot[]>([]);
  const [addVisible, setAddVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [bootToUpdate, setBootToUpdate] = useState<Boot | undefined>(undefined);
  const [bootToUpdateIndex, setBootToUpdateIndex] = useState<number | null>(
    null
  );

  const bootDataHandler = (id: string, type: string) => {
    const newId = id.trim();
    const newType = type.trim();
    if (!newId && !newType) return;
    setBootList((prev) => [...prev, { id: newId, type: newType }]);
    setAddVisible(false);
  };

  const deleteBoot = (removeIndex: number) => {
    setBootList((prev) => prev.filter((_, idx) => idx !== removeIndex));
  };

  const updateBoot = (index: number) => {
    setBootToUpdateIndex(index);
    setBootToUpdate(bootList[index]);
    setUpdateVisible(true);
  };

  const saveBootUpdate = (id: string, type: string) => {
    if (bootToUpdateIndex === null) return;
    const newId = id.trim();
    const newType = type.trim();
    setBootList((prev) =>
      prev.map((b, i) =>
        i === bootToUpdateIndex ? { id: newId, type: newType } : b
      )
    );
    setUpdateVisible(false);
    setBootToUpdate(undefined);
    setBootToUpdateIndex(null);
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
          style={styles.scrollview}
          contentContainerStyle={styles.listContent}
        >
          {bootList.map((item, index) => (
            <TouchableOpacity
              key={`${item.id}-${index}`}
              onLongPress={() => deleteBoot(index)}
              onPress={() => updateBoot(index)}
            >
              <View style={styles.listItem}>
                <Text>
                  {item.id}: {item.type}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <AddBoot
        visible={addVisible}
        onAdd={bootDataHandler}
        onCancel={() => setAddVisible(false)}
      />

      <UpdateBoot
        visible={updateVisible}
        bootToUpdate={bootToUpdate}
        onCancel={() => {
          setUpdateVisible(false);
          setBootToUpdate(undefined);
          setBootToUpdateIndex(null);
        }}
        onSave={saveBootUpdate}
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

    borderRadius: 4,
    paddingVertical: 8,
  },
  scrollview: { width: "100%" },
  listContent: { paddingHorizontal: 8, paddingBottom: 24 },
  listItem: {
    borderWidth: 3,
    borderColor: "black",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 6,
    borderRadius: 4,
  },
});
