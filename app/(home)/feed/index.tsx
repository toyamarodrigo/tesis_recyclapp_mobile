import { StyleSheet, View, Image, ScrollView } from "react-native";
import { List, Card, Text, FAB } from "react-native-paper";
import { colors } from "@constants/colors.constant";
import { usePostList, usePostListByClerkId } from "@hooks/usePost";
import { Post } from "@models/post.type";
import { useAuth } from "@clerk/clerk-expo";
import { IMAGE } from "@constants/image.constant";
import { router, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import { MaterialProduct } from "@models/materialProduct.type";

interface MaterialCardProps {
  post: Post;
  id: string;
  materials: MaterialProduct[] | undefined;
}

const MaterialCard = ({ post, id, materials }: MaterialCardProps) => {
  const imageUrl = `${IMAGE.CLOUDINARY_URL}${IMAGE.POST_FOLDER}/${id}.jpg?timestamp=${Date.now()}`;
  const imageUrl2 = `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${post.materialProductId}.png`;
  const [image, setImage] = useState<string>(imageUrl2);

  const getMaterialName = (id: string) => {
    return materials?.find((material) => material.id === id)?.name || "";
  };

  useEffect(() => {
    (async () => {
      try {
        const test = await axios.get(imageUrl);
        if (test.status === 200) setImage(imageUrl);
        return;
      } catch (e) {
        return;
      }
    })();
  }, []);

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
          <Text variant="bodyMedium">Cantidad: {post.quantity}</Text>
          <Text variant="bodyMedium">Puntos: {post.pointsAwarded}</Text>
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
  const { data: postsByClerkId } = usePostListByClerkId({ userId });
  const { data: materials } = useMaterialProductList();
  const { data: postsList } = usePostList();

  // const filterPosts = (purpose: "WANT" | "HAVE") => {
  //   return postsList?.filter((post) => post.purpouse === purpose) || [];
  // };

  //TODO Mis participaciones interaccion del usuario, postcommitment o chat: postclerk o posts

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <List.Section>
          <List.Accordion
            title={`Mis Publicaciones (${postsByClerkId && postsByClerkId.length})`}
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
            {postsByClerkId?.map((post) => (
              <MaterialCard
                key={post.id}
                post={post}
                id={post.id}
                materials={materials}
              />
            ))}
          </List.Accordion>

          <List.Accordion
            title={`Mis participaciones (${postsByClerkId && postsByClerkId.length})`}
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
            {postsByClerkId
              ?.filter((post) => post.isReserved)
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
            title={`Todas las publicaciones (${postsList && postsList.length})`}
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
