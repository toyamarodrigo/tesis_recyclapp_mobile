import { Link, Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  IconButton,
  Button,
  Title,
  Text,
  Card,
  Avatar,
  Portal,
  Dialog,
  TextInput,
} from "react-native-paper";
import { usePostById } from "@hooks/usePost";
import React, { useEffect, useState } from "react";
import { theme, useAppTheme } from "src/theme";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import { IMAGE } from "@constants/image.constant";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import { useCommentListByPostId, useCreateComment } from "@hooks/useComment";
import { CommentCreate } from "@models/comment.type";
import CardComment from "@components/CardComment";

export default function DetailPost() {
  const { user, isSignedIn } = useUser();
  if (!user || !isSignedIn) return <Redirect href="/(auth)/sign-in" />;
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
  const { data: comments, isPending: isPendingComments } =
    useCommentListByPostId({ postId: postId });
  const {
    mutateAsync: createComment,
    isPending: pendingCreateComment,
    isError,
  } = useCreateComment();

  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [tempText, setTempText] = useState("");

  const handleConfirm = async () => {
    const commentCreateData: CommentCreate = {
      postId: postId,
      userId: user.id,
      username: user.username || "usuario",
      message: tempText,
    };
    await createComment(commentCreateData);
    handleCancel();
    Alert.alert(
      "¡Operación exitosa!",
      "Su comentario fue enviado exitosamente."
    );

    if (isError) {
      Alert.alert(
        "Error",
        "Ocurrió un error al dejar tu comentario. Por favor, intenta nuevamente."
      );
    }
  };

  const handleCancel = () => {
    setTempText("");
    setIsCommentEditing(false);
  };

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
        <Portal>
          <Dialog visible={isCommentEditing} onDismiss={handleCancel}>
            <Dialog.Title>Comentar</Dialog.Title>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                value={tempText}
                onChangeText={setTempText}
                placeholder="Deja tu comentario aquí..."
                maxLength={250}
                multiline
                style={styles.input}
              />
              <Text style={styles.charCount}>
                {tempText.length}/250 caracteres
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleCancel} style={styles.button}>
                Cancelar
              </Button>
              <Button onPress={handleConfirm} style={styles.button}>
                Comentar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
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
                <Text style={styles.grayText}>@{post?.username}</Text>
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
                    : "Publicación finalizada"}
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
              {post?.userId == user.id && !post.isArchived && (
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
                  onPress={() => setIsCommentEditing(true)}
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
          <Text style={styles.grayText}>
            Comentarios ({comments?.length ?? 0})
          </Text>
          <View style={{ width: "100%" }}>
            {comments?.length ? (
              comments.map((comment) => (
                <CardComment comment={comment} key={comment.id} />
              ))
            ) : (
              <Text>Aún no hay comentarios.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    marginBottom: 16,
    fontSize: 16,
  },
  input: {
    height: 100,
    textAlignVertical: "top",
  },
  charCount: {
    textAlign: "right",
    fontSize: 12,
    color: "gray",
  },
  button: {
    marginHorizontal: 8,
  },
  grayText: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.backdrop,
  },
});
