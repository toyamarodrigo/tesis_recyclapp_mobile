import { recyclingInfo } from "@features/wiki/constants/recycling-info";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { IconButton, Text, Card } from "react-native-paper";
import { theme } from "src/theme";

export default function HowToRecycleMaterialLayout() {
  const { material } = useLocalSearchParams();
  const formattedMaterial =
    typeof material === "string"
      ? material.charAt(0).toUpperCase() + material.slice(1).replace(/-/g, " ")
      : "";
  const router = useRouter();

  const materialInfo = recyclingInfo.find(
    (item) => item.title.toLowerCase() === formattedMaterial.toLowerCase()
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <IconButton icon="chevron-left" size={32} iconColor="#1B5E20" />
        </TouchableOpacity>
        <Text variant="headlineSmall" style={styles.title}>
          {formattedMaterial}
        </Text>
      </View>
      <ScrollView style={styles.content}>
        <Text variant="titleLarge" style={styles.subtitle}>
          Cómo reciclar:
        </Text>
        {materialInfo?.howToRecycle.map((step, index) => (
          <View key={step} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{index + 1}.</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
        <Card style={styles.importantInfo}>
          <Card.Content>
            <Text style={styles.importantInfoTitle}>
              Información importante:
            </Text>
            <Text style={styles.importantInfoText}>
              Siempre asegúrate de que los artículos estén limpios y secos antes
              de reciclarlos.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingVertical: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontWeight: "bold",
    color: "#4CAF50",
    fontSize: 24,
  },
  subtitle: {
    marginTop: 20,
    marginBottom: 16,
    color: "#1B5E20",
    fontSize: 22,
    fontWeight: "bold",
  },
  stepContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  stepNumber: {
    fontWeight: "bold",
    marginRight: 12,
    color: "#1B5E20",
    fontSize: 18,
  },
  stepText: {
    flex: 1,
    flexWrap: "wrap",
    fontSize: 18,
    lineHeight: 24,
  },
  importantInfo: {
    marginTop: 24,
    marginBottom: 24,
    backgroundColor: "#E8F5E9",
  },
  importantInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 8,
  },
  importantInfoText: {
    fontSize: 16,
    color: "#1B5E20",
  },
});
