import { StyleSheet, View, Image } from "react-native";
import { List, Card, Text, FAB } from "react-native-paper";
import { colors } from "@constants/colors.constant";
import { usePostList, usePostListByClerkId } from "@hooks/usePost";
import { Post } from "@models/post.type";
import { useAuth } from "@clerk/clerk-expo";
import { IMAGE } from "@constants/image.constant";
import { useRouter } from "expo-router";

interface MaterialCardProps {
  post: Post;
}

const MaterialCard = ({ post }: MaterialCardProps) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Image
          source={{
            uri: `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${IMAGE.PAPER_GENERIC}`,
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardDetails}>
          <Text variant="titleMedium">Material: {post.materialProductId}</Text>
          <Text variant="bodyMedium">Cantidad: {post.quantity}</Text>
          <Text variant="bodyMedium">Puntos: {post.pointsAwared}</Text>
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
  const { data } = usePostList();

  const filterPosts = (purpose: "WANT" | "HAVE") => {
    return data?.filter((post) => post.purpouse === purpose) || [];
  };

  return (
    <View style={styles.container}>
      <List.Section>
        <List.Accordion
          title="Mis Publicaciones"
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
            <MaterialCard key={post.id} post={post} />
          ))}
        </List.Accordion>

        <List.Accordion
          title="Aceptadas - En Progreso"
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
            .map((post) => <MaterialCard key={post.id} post={post} />)}
        </List.Accordion>

        <List.Accordion
          title="Materiales publicados"
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
          {filterPosts("HAVE").map((post) => (
            <MaterialCard key={post.id} post={post} />
          ))}
        </List.Accordion>
      </List.Section>

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
});

export default Feed;
