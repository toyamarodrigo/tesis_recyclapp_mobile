import { IMAGE } from "@constants/image.constant";
import { View, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

export const NoDataCard = ({ image }: { image: string }) => {
  const timestamp = `?timestamp=${Date.now()}`;
  const imageUrl = IMAGE.CLOUDINARY_URL + image + timestamp;

  return (
    <Card style={styles.adCard}>
      <View style={styles.cardContent}>
        <Card.Cover source={{ uri: imageUrl }} style={styles.adImage} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  adCard: {
    borderRadius: 15,
    width: 300,
  },
  cardContent: {
    height: 250,
    overflow: "hidden",
    borderRadius: 15,
  },
  adImage: {
    borderRadius: 15,
    width: 300,
    height: 250,
  },
});
