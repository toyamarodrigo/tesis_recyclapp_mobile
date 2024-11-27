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
          contentFit="cover"
        />
        <View style={styles.cardDetails}>
          <Text variant="titleMedium" style={styles.materialName}>
            {getMaterialName(post.materialProductId)}
          </Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: post.isActive
                    ? theme.colors.secondary
                    : theme.colors.error,
                },
              ]}
            />
            <Text
              variant="bodyMedium"
              style={[
                styles.statusText,
                {
                  color: post.isActive
                    ? theme.colors.secondary
                    : theme.colors.error,
                },
              ]}
            >
              {post.isActive ? "Activa" : "Finalizada"}
            </Text>
          </View>
          <View style={styles.infoContainer}>
            <Text variant="bodyMedium" style={styles.infoText}>
              Cantidad: {post.quantity}
            </Text>
            <Text variant="bodyMedium" style={styles.pointsText}>
              +{post.pointsAwarded} pts
            </Text>
          </View>
          {post.description && (
            <Text variant="bodySmall" style={styles.description} numberOfLines={2}>
              {post.description}
            </Text>
          )}
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
    borderRadius: 12,
    elevation: 2,
  },
  cardContent: {
    flexDirection: "row",
    padding: 12,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cardDetails: {
    marginLeft: 16,
    flex: 1,
  },
  materialName: {
    fontWeight: "700",
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "500",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  infoText: {
    color: colors.gray[600],
  },
  pointsText: {
    color: colors.green[600],
    fontWeight: "600",
  },
  description: {
    color: colors.gray[500],
    lineHeight: 16,
  },
  scrollContent: {
    paddingBottom: 80,
  },
});
