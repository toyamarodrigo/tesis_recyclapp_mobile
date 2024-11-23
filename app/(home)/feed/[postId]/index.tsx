import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  IconButton,
  Button,
  Title,
  Text,
  Card,
  Avatar,
} from "react-native-paper";
import { usePostById } from "@hooks/usePost";
import React, { useEffect, useState } from "react";
import { useAppTheme } from "src/theme";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import { IMAGE } from "@constants/image.constant";
import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";

export default function DetailPost() {
  const { userId, isSignedIn } = useAuth();
  if (!userId || !isSignedIn) return <Redirect href="/(auth)/sign-in" />;
  const params = useLocalSearchParams();
  const postId = params.postId as string;
  const { data: post, isPending } = usePostById({ id: postId });
  const theme = useAppTheme();
  const { data: materials } = useMaterialProductList();
  const imageUrlPost = `${IMAGE.CLOUDINARY_URL}${IMAGE.POST_FOLDER}/${postId}.jpg?timestamp=${Date.now()}`;
  const imageUrlPostMaterial = `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${post?.materialProductId}.png`;
  const imageUrlPostUser = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_GENERIC}`;
  const [imagePost, setImagePost] = useState<string>("");
  const [imagePostUser, setImagePostUser] = useState<string>(imageUrlPostUser);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const test = await axios.get(imageUrlPost);
        if (test.status === 200) setImagePost(imageUrlPost);
        return;
      } catch (e) {
        if (post) {
          setImagePost(imageUrlPostMaterial);
        } else {
          setImagePost(
            `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/special.png`
          );
        }
        return;
      }
    })();
    if (post?.userId) {
      const timestamp = `?timestamp=${Date.now()}`;
      const urlImage = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_FOLDER}/${post.userId}.jpg${timestamp}`;
      setImagePostUser(urlImage);
    }
  }, [post]);

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/(home)/feed" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>Publicación</Title>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        {isPending && <ActivityIndicator size="large" />}
        <View style={{ width: "100%" }}>
          <Card style={{ alignItems: "center", marginVertical: 20 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Avatar.Image
                size={64}
                style={{ marginRight: 10 }}
                source={{
                  uri: imagePostUser,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: theme.colors.backdrop,
                  }}
                >
                  @{post?.username}
                </Text>
                <Text
                  style={{
                    marginTop: 5,
                    fontSize: 16,
                    color: post?.isActive
                      ? theme.colors.secondary
                      : theme.colors.error,
                  }}
                >
                  {post?.isActive
                    ? "Publicación activa"
                    : "Publicación finalizada"}{" "}
                  {post?.isReserved ? "y reservada" : "y no reservada"}
                </Text>
              </View>
            </View>
            <Card.Content>
              <Text
                variant="titleLarge"
                style={{ color: theme.colors.onBackground }}
              >
                {post?.purpouse == "HAVE" ? "Ofrezco " : "Busco "}
                {materials
                  ?.find((material) => material.id === post?.materialProductId)
                  ?.name.toLowerCase() || "material"}
                {", unidades: "}
                {post?.quantity}
              </Text>
              <Text
                variant="bodyMedium"
                style={{ marginVertical: 10, color: theme.colors.onBackground }}
              >
                {post?.description}
              </Text>
            </Card.Content>
            {imagePost ? (
              <Card.Cover
                source={{ uri: imagePost }}
                style={{
                  margin: 10,
                  width: 350,
                  height: 250,
                  borderRadius: 8,
                }}
              />
            ) : (
              <ActivityIndicator size="large" />
            )}
            <Card.Actions style={{ marginBottom: 10 }}>
              {post?.userId == userId && !post.isArchived && (
                <Button
                  mode="contained"
                  onPress={() => router.push(`/feed/${postId}/edit`)}
                  loading={isPending}
                  disabled={isPending}
                  buttonColor={theme.colors.secondaryContainer}
                  textColor={theme.colors.onSecondaryContainer}
                >
                  Editar publicación
                </Button>
              )}
              {!post?.isArchived && (
                <Button
                  mode="contained"
                  onPress={() => console.log("comentario")}
                  loading={isPending}
                  disabled={isPending}
                  buttonColor={theme.colors.tertiaryContainer}
                  textColor={theme.colors.onTertiaryContainer}
                >
                  Dejar un comentario
                </Button>
              )}
            </Card.Actions>
          </Card>
        </View>
        <View style={{ margin: 20 }}>
          <Text>Comentarios</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
