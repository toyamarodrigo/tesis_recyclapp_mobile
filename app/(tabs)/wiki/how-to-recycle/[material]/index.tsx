import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, Text } from "react-native-paper";

export default function HowToRecycleMaterialLayout() {
  const { material } = useLocalSearchParams();
  const formatedMaterial =
    typeof material === "string"
      ? material.charAt(0).toUpperCase() + material.slice(1)
      : "";
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconButton icon="chevron-left" size={32} />
        </TouchableOpacity>
        <Text variant="titleLarge" style={styles.title}>
          {formatedMaterial}
        </Text>
      </View>
      <View style={styles.content}>
        <Text>Content</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
