import { Result } from "@models/news";
import { View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export const NewsCard = ({
  item,
  onPress,
}: {
  item: Result;
  onPress: (item: Result) => void;
}) => (
  <Card style={styles.newsCard} onPress={() => onPress(item)}>
    <View style={styles.cardContent}>
      <Card.Cover
        source={{ uri: item?.image_url || "" }}
        style={styles.newsImage}
      />
      <View style={styles.newsOverlay}>
        <Text variant="titleMedium" style={styles.newsTitle}>
          {item.title}
        </Text>
      </View>
    </View>
  </Card>
);

const styles = StyleSheet.create({
  newsCard: {
    marginHorizontal: 10,
    borderRadius: 15,
  },
  cardContent: {
    height: "100%",
    overflow: "hidden",
    borderRadius: 15,
  },
  newsImage: {
    height: "100%",
    borderRadius: 15,
  },
  newsOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  newsTitle: {
    color: "white",
  },
});
