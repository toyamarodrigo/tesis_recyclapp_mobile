import { StyleSheet } from "react-native";
import { Card, ActivityIndicator } from "react-native-paper";

interface PostCardImageProps {
  imageUrl: string;
  isLoading: boolean;
}

export function PostCardImage({ imageUrl, isLoading }: PostCardImageProps) {
  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return <Card.Cover source={{ uri: imageUrl }} style={styles.cardImage} />;
}

const styles = StyleSheet.create({
  cardImage: {
    marginHorizontal: 16,
    marginBottom: 16,
    height: 250,
    borderRadius: 12,
  },
  loader: {
    margin: 16,
  },
});
