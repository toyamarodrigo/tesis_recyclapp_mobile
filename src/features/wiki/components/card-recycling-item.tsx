import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
import { materialColors } from "../models/materials";

export const CardRecyclingItem = ({ item, onPress }) => {
  const formatMaterial = (material) => {
    if (material === "paper") return "Papel y cartón";
    if (material === "plastic") return "Plásticos";
    if (material === "metal") return "Metales";
    if (material === "glass") return "Vidrio";

    return material;
  };

  return (
    <Card style={[styles.card, styles.materialCard]} onPress={onPress}>
      <Card.Content>
        <Text variant="titleMedium" style={styles.cardTitle}>
          {item.title}
        </Text>
        <View style={styles.chipContainer}>
          {item.materials.map((material) => (
            <Chip
              key={material}
              compact
              style={[
                styles.chip,
                { backgroundColor: materialColors[material] },
              ]}
              textStyle={styles.chipText}
            >
              {formatMaterial(material)}
            </Chip>
          ))}
        </View>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.link}>Ver más</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingBottom: 8,
    backgroundColor: "#E8F5E9",
  },
  materialCard: {
    marginTop: 16,
  },
  cardTitle: {
    color: "#1B5E20",
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  chip: {
    marginRight: 4,
    marginBottom: 4,
  },
  chipText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cardActions: {
    justifyContent: "flex-end",
    paddingRight: 16,
  },
  link: {
    color: "#1B5E20",
    textDecorationLine: "underline",
  },
});
