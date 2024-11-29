import { Link, Redirect, router, useLocalSearchParams } from "expo-router";
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import {
  ActivityIndicator,
  IconButton,
  Title,
  Portal,
  Dialog,
  TextInput,
  Button,
  Text,
  HelperText,
} from "react-native-paper";
import { usePostById } from "@hooks/usePost";
import React, { useEffect, useState } from "react";
import { theme } from "src/theme";
import { useMaterialProductList } from "@hooks/useMaterialProduct";
import { IMAGE } from "@constants/image.constant";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import { useCommentListByPostId, useCreateComment } from "@hooks/useComment";
import type { CommentCreate } from "@models/comment.type";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PostCard } from "@features/feed/components/post-card";
import CardComment from "@features/feed/components/card-comment";

const commentSchema = z.object({
  message: z
    .string()
    .min(1, "El comentario no puede estar vacío")
    .max(250, "El comentario no puede exceder los 250 caracteres"),
});

type CommentFormData = z.infer<typeof commentSchema>;

export default function DetailPost() {
  const { user, isSignedIn } = useUser();
  if (!user || !isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  const params = useLocalSearchParams();
  const postId = params.postId as string;

  const { data: post, refetch: refetchPost } = usePostById({ id: postId });
  const { data: materials } = useMaterialProductList();
  const { data: comments, refetch: refetchComments } = useCommentListByPostId({
    postId: postId,
  });
  const { mutateAsync: createComment, isPending } = useCreateComment();

  const baseImageUrlPost = `${IMAGE.CLOUDINARY_URL}${IMAGE.POST_FOLDER}/${postId}.jpg`;
  const imageUrlPostMaterial = `${IMAGE.CLOUDINARY_URL}${IMAGE.UTILS_FOLDER}/${post?.materialProductId}.png`;
  const imageUrlPostUser = `${IMAGE.CLOUDINARY_URL}${IMAGE.USER_GENERIC}`;

  const [imagePost, setImagePost] = useState<string>("");
  const [imagePostUser, setImagePostUser] = useState<string>(imageUrlPostUser);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = async (data: CommentFormData) => {
    const commentCreateData: CommentCreate = {
      postId: postId,
      userId: user.id,
      username: user.username || "usuario",
      message: data.message,
    };
    await createComment(commentCreateData);
    reset();
    setIsCommentEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsCommentEditing(false);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchPost(), refetchComments()]);
    setRefreshing(false);
  }, [refetchPost, refetchComments]);

  useEffect(() => {
    (async () => {
      try {
        const test = await axios.get(baseImageUrlPost);
        if (test.status === 200) setImagePost(baseImageUrlPost);
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
  }, [baseImageUrlPost, imageUrlPostMaterial, post]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href="/(home)/feed" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={styles.title}>Publicación</Title>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <Portal>
          <Dialog visible={isCommentEditing} onDismiss={handleCancel}>
            <Dialog.Title>Comentar</Dialog.Title>
            <Dialog.Content>
              <Controller
                control={control}
                name="message"
                render={({ field: { onChange, value } }) => (
                  <>
                    <TextInput
                      mode="outlined"
                      value={value}
                      onChangeText={onChange}
                      placeholder="Deja tu comentario aquí..."
                      multiline
                      style={styles.input}
                      error={!!errors.message}
                    />
                    {errors.message && (
                      <HelperText type="error">
                        {errors.message.message}
                      </HelperText>
                    )}
                    <Text style={styles.charCount}>
                      {value.length}/250 caracteres
                    </Text>
                  </>
                )}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={handleCancel}
                style={styles.button}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
                loading={isPending}
                disabled={isPending}
              >
                Comentar
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        {isPending && <ActivityIndicator size="large" />}

        <View style={styles.cardContainer}>
          <PostCard
            post={post}
            imagePost={imagePost}
            imagePostUser={imagePostUser}
            materials={materials}
            isLoading={isPending}
            userId={user.id}
            onEdit={() => router.push(`/feed/${postId}/edit`)}
            onComment={() => setIsCommentEditing(true)}
          />
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>
            Comentarios ({comments?.length ?? 0})
          </Text>
          <View style={styles.commentsList}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    zIndex: 1,
    alignItems: "center",
  },
  title: {
    color: theme.colors.primary,
    fontWeight: 700,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  cardContainer: {
    width: "100%",
  },
  commentsSection: {
    margin: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.backdrop,
  },
  commentsList: {
    width: "100%",
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
});
