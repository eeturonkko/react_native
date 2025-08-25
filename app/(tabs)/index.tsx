import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Create the base app</ThemedText>
        <ThemedText>Start with a new project.</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Add components</ThemedText>
        <ThemedText>
          Create two simple text elements. One for your name and one for your
          city. They should each render on their own line.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">
          Step 3: Align them at the bottom
        </ThemedText>
        <ThemedText>
          Use a container with{" "}
          <ThemedText type="defaultSemiBold">
            justifyContent: flex-end
          </ThemedText>{" "}
          so that your name and city stay at the bottom of the screen. You can
          also use{" "}
          <ThemedText type="defaultSemiBold">alignItems: center</ThemedText> to
          center them horizontally.
        </ThemedText>
      </ThemedView>

      {/* Actual assignment output */}
      <View style={styles.bottomContainer}>
        <ThemedText type="title">Eetu Rönkkö</ThemedText>
        <ThemedText type="subtitle">Vantaa</ThemedText>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 12,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20,
  },
});
