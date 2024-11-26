import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { List, Card, Text, FAB } from "react-native-paper";
import { colors } from "@constants/colors.constant";
import { usePostList, usePostListByClerkId } from "@hooks/usePost";
import type { Post } from "@models/post.type";
import { useAuth } from "@clerk/clerk-expo";
import { IMAGE } from "@constants/image.constant";
import { router, useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import type { MaterialProduct } from "@models/materialProduct.type";
import { theme } from "src/theme";

interface MaterialCardProps {
  post: Post;
  id: string;
  materials: MaterialProduct[] | undefined;
}

const MaterialCard = ({ post, id, materials }: MaterialCardProps) => {
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

const Feed = () => {
  const router = useRouter();
  const { userId, isSignedIn } = useAuth();
  if (!isSignedIn) return null;

  const [refreshing, setRefreshing] = useState(false);
  const { data: postsByClerkId, refetch: refetchUserPosts } =
    usePostListByClerkId({ userId });
  const { data: materials, refetch: refetchMaterials } =
    useMaterialProductList();
  const { data: postsList, refetch: refetchPosts } = usePostList();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.allSettled([
      refetchUserPosts(),
      refetchMaterials(),
      refetchPosts(),
    ]);
    setRefreshing(false);
  }, [refetchUserPosts, refetchMaterials, refetchPosts]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.green[500]]} // Android
            tintColor={colors.green[500]} // iOS
          />
        }
      >
        <List.Section>
          <List.Accordion
            title="Mis publicaciones activas"
            style={{
              borderRadius: 8,
              padding: 8,
              marginBottom: 16,
              backgroundColor: colors.gray[100],
            }}
            left={(props) => {
              return <List.Icon {...props} icon="post" />;
            }}
          >
            {postsByClerkId
              ?.filter((post) => post.isActive)
              .map((post) => (
                <MaterialCard
                  key={post.id}
                  post={post}
                  id={post.id}
                  materials={materials}
                />
              ))}
          </List.Accordion>

          <List.Accordion
            title="Todas las publicaciones activas"
            left={(props) => {
              return <List.Icon {...props} icon="progress-clock" />;
            }}
            style={{
              borderRadius: 8,
              padding: 8,
              marginBottom: 16,
              backgroundColor: colors.purple[100],
            }}
          >
            {postsList
              ?.filter((post) => post.isActive)
              .map((post) => (
                <MaterialCard
                  key={post.id}
                  post={post}
                  id={post.id}
                  materials={materials}
                />
              ))}
          </List.Accordion>

          <List.Accordion
            title="Todas las publicaciones"
            left={(props) => {
              return <List.Icon {...props} icon="recycle" />;
            }}
            style={{
              borderRadius: 8,
              padding: 8,
              marginBottom: 16,
              backgroundColor: colors.green[100],
            }}
          >
            {postsList?.map((post) => (
              <MaterialCard
                key={post.id}
                post={post}
                id={post.id}
                materials={materials}
              />
            ))}
          </List.Accordion>
        </List.Section>
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => router.push("/feed/new")}
        color="white"
      />
    </View>
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

export default Feed;
