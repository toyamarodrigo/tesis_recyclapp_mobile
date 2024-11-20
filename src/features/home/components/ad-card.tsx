import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import type { Ad } from "@models/advertisement.type";

export const AdCard = ({
  item,
  onPress,
}: {
  item: Ad;
  onPress: (item: Ad) => void;
}) => {
  return (
    <Card style={styles.adCard} onPress={() => onPress(item)}>
      <View style={styles.cardContent}>
        {item.image && (
          <Card.Cover source={{ uri: item.image }} style={styles.adImage} />
        )}
        <View style={styles.adOverlay}>
          <Text variant="bodyMedium" style={styles.adText}>
            {item.title}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  adCard: {
    borderRadius: 15,
  },
  cardContent: {
    height: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
  adImage: {
    height: "100%",
    borderRadius: 15,
  },
  adOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  adText: {
    color: "white",
  },
});
