import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { CardItem } from "@features/wiki/models/card-material.type";
import { useSelectedMaterialStore } from "../hooks/useSelectedMaterial";
import { normalizeText } from "../utils/normalize-text";

export const CardMaterial: React.FC<{
  item: CardItem;
  sectionTitle: string;
}> = ({ item, sectionTitle }) => {
  const router = useRouter();
  const setSelectedMaterial = useSelectedMaterialStore(
    (state) => state.setSelectedMaterial
  );

  const handlePress = () => {
    if (!item.material) return;
    setSelectedMaterial(normalizeText(item.material[0]));
    router.push("/wiki/how-to-recycle");
  };

  const isRecyclable = sectionTitle === "Materiales reciclables";
  const Container = isRecyclable ? TouchableOpacity : View;

  return (
    <Container
      style={[
        styles.card,
        isRecyclable ? styles.recyclableCard : styles.specialWasteCard,
      ]}
      {...(isRecyclable ? { onPress: handlePress } : {})}
    >
      <MaterialCommunityIcons
        name={item.icon}
        size={24}
        color="#1B5E20"
        style={styles.cardIcon}
      />
      <Text style={styles.cardText}>{item.name}</Text>
    </Container>
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
