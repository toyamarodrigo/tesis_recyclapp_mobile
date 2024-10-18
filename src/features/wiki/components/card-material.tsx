import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { CardItem } from "@features/wiki/models/card-material.type";

export const CardMaterial: React.FC<{
  item: CardItem;
  sectionTitle: string;
}> = ({ item, sectionTitle }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        sectionTitle === "Materiales reciclables"
          ? styles.recyclableCard
          : styles.specialWasteCard,
      ]}
      onPress={() =>
        router.push(
          `/wiki/how-to-recycle/${item.name.toLowerCase().replace(/ /g, "-")}`
        )
      }
    >
      <MaterialCommunityIcons
        name={item.icon}
        size={24}
        color="#1B5E20"
        style={styles.cardIcon}
      />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 16,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  recyclableCard: {
    backgroundColor: "#C8E6C9",
  },
  specialWasteCard: {
    backgroundColor: "#FFECB3",
  },
  cardIcon: {
    marginRight: 16,
  },
  cardText: {
    fontSize: 14,
    color: "#1B5E20",
    flex: 1,
  },
});
