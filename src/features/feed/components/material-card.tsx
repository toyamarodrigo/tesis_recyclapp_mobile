import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { IMAGE } from "@constants/image.constant";
import type { MaterialProduct } from "@models/materialProduct.type";
import type { Post } from "@models/post.type";
import axios from "axios";
import { colors } from "@constants/colors.constant";
import { View } from "react-native";
import { theme } from "src/theme";
import { Image } from "expo-image";
import { router } from "expo-router";

interface MaterialCardProps {
  post: Post;
  id: string;
  materials: MaterialProduct[] | undefined;
}

export const MaterialCard = ({ post, id, materials }: MaterialCardProps) => {
  const baseImageUrl = `${IMAGE.CLOUDINARY_URL}${IMAGE.POST_FOLDER}/${id}.jpg`;
  const imageUrl2 = `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${post.materialProductId}.png`;
  const [image, setImage] = useState<string>(imageUrl2);

  const getMaterialName = (id: string) => {
    return materials?.find((material) => material.id === id)?.name || "";
  };

  useEffect(() => {
    (async () => {
      try {
        const cloudinaryImage = await axios.get(
          `${baseImageUrl}?timestamp=${Date.now()}`
        );
        if (cloudinaryImage.status === 200) setImage(baseImageUrl);
        return;
      } catch (e) {
        return;
      }
    })();
  }, [baseImageUrl]);

  return (
    <Card style={styles.card} onPress={() => router.push(`/feed/${post.id}`)}>
      <Card.Content style={styles.cardContent}>
        <Image
          source={{
            uri: image || "",
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardDetails}>
          <Text variant="titleMedium">
            Material: {getMaterialName(post.materialProductId)}
          </Text>
          <Text
            variant="bodyMedium"
            style={{
              color: post.isActive
                ? theme.colors.secondary
                : theme.colors.error,
            }}
          >
            {post.isActive ? "Activa" : "Finalizada"}
          </Text>
          <Text variant="bodyMedium">Cantidad: {post.quantity}</Text>
          <Text variant="bodyMedium">Puntos: +{post.pointsAwarded}</Text>
          <Text variant="bodyMedium">{post.description}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: colors.green[500],
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cardContent: {
    flexDirection: "row",
    padding: 8,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  cardDetails: {
    marginLeft: 12,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
});
