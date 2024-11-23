import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  IconButton,
  Button,
  Title,
  Text,
} from "react-native-paper";
import { usePostById } from "@hooks/usePost";
import React, { useEffect, useState } from "react";
import { useAppTheme } from "src/theme";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import { IMAGE } from "@constants/image.constant";
import axios from "axios";

export default function DetailPost() {
  const params = useLocalSearchParams();
  const postId = params.postId as string;
  const { data: post, isPending } = usePostById({ id: postId });
  const theme = useAppTheme();
  const { data: materials } = useMaterialProductList();
  const imageUrl = `${IMAGE.CLOUDINARY_URL}${IMAGE.POST_FOLDER}/${postId}.jpg?timestamp=${Date.now()}`;
  const [image, setImage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const test = await axios.get(imageUrl);
        if (test.status === 200) setImage(imageUrl);
        return;
      } catch (e) {
        if (post) {
          setImage(
            `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${post?.materialProductId}.png`
          );
        } else {
          setImage(`${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/special.png`);
        }
        return;
      }
    })();
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
          <Text>
            Soy {post?.username} y
            {post?.purpouse == "HAVE" ? " ofrezco " : " busco "}
            {materials
              ?.find((material) => material.id === post?.materialProductId)
              ?.name.toLowerCase() || "material"}
          </Text>
          <Text>Descripción: {post?.description}</Text>

          <Text>Está reservado: {post?.isReserved ? "Sí" : "No"}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              margin: 10,
              gap: 15,
            }}
          >
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
