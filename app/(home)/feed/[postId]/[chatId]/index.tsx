import { useUser } from "@clerk/clerk-expo";
import CardChatMessage from "@features/feed/components/card-chat-message";
import DataEmpty from "@components/DataEmpty";
import { useChatById, useUpdateChat } from "@hooks/useChat";
import { useCreateChatMessage } from "@hooks/useChatMessage";
import { usePostById, useUpdatePost } from "@hooks/usePost";
import { useUpdateUserCustomer, useUserCustomerByClerk } from "@hooks/useUser";
import type { ChatUpdate } from "@models/chat.type";
import type { PostUpdate } from "@models/post.type";
import type { UserCustomerPut } from "@models/userCustomer.type";
import { Link, Redirect, router, useLocalSearchParams } from "expo-router";
import { Fragment, useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Keyboard,
  Alert,
  RefreshControl,
} from "react-native";
import {
  IconButton,
  Title,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Portal,
  Dialog,
} from "react-native-paper";
import { theme } from "src/theme";
import { useForm, Controller } from "react-hook-form";

type DialogType = "post" | "comment" | null;

export default function Chatconvo() {
  const { user } = useUser();
  if (!user) return <Redirect href="/(auth)/sign-in" />;

  const params = useLocalSearchParams();
  const postId = params.postId as string;
  const chatId = params.chatId as string;

  const {
    data: chat,
    isPending,
    refetch: refetchChat,
  } = useChatById({ id: chatId });
  const { data: post } = usePostById({ id: postId });
  const { mutateAsync: createChatMessage, isPending: isUpdatingChatMessage } =
    useCreateChatMessage();
  const { mutateAsync: updateChat } = useUpdateChat();
  const { mutateAsync: updatePost } = useUpdatePost();
  const { mutateAsync: updateUser } = useUpdateUserCustomer();

  const { data: userPostClerk } = useUserCustomerByClerk({
    userId: chat?.userPostId ?? "",
  });
  const { data: userCommentClerk } = useUserCustomerByClerk({
    userId: chat?.userCommentId ?? "",
  });

  const [dialogType, setDialogType] = useState<DialogType>(null);
  const [code, setCode] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      message: "",
    },
  });

  const messageLength = watch("message")?.length ?? 0;
  const isPostAuthor = user.id === post?.userId;
  const isArchived = chat?.isArchived ?? false;

  const handleSend = async (data: { message: string }) => {
    if (!chat) return;

    await createChatMessage({
      chatId: chat.id,
      message: data.message,
      senderId: user.id,
      senderUsername: user.username ?? "usuario",
    });

    reset();
    Keyboard.dismiss();
  };

  const handleConfirmExchange = () => {
    setDialogType(isPostAuthor ? "post" : "comment");
  };

  const handleConfirmDialog = async () => {
    if (!chat?.id || !post?.id || !userPostClerk?.id || !userCommentClerk?.id)
      return;

    if (chat.generatedCode !== code.toUpperCase()) {
      Alert.alert(
        "Error",
        "El código ingresado es incorrecto. Intente nuevamente."
      );
      return;
    }

    const date = new Date();
    const updates = {
      chat: {
        id: chat.id,
        endDate: date,
        isActive: false,
        isArchived: true,
      } as ChatUpdate,
      post: {
        id: post.id,
        isActive: false,
        isArchived: true,
      } as PostUpdate,
      userPost: {
        id: userPostClerk.id,
        pointsTotal: userPostClerk.pointsTotal + post.pointsAwarded,
        pointsCurrent: userPostClerk.pointsCurrent + post.pointsAwarded,
      } as UserCustomerPut,
      userComment: {
        id: userCommentClerk.id,
        pointsTotal: userCommentClerk.pointsTotal + post.pointsAwarded,
        pointsCurrent: userCommentClerk.pointsCurrent + post.pointsAwarded,
      } as UserCustomerPut,
    };

    setIsUpdating(true);

    try {
      await Promise.all([
        updateUser(updates.userPost),
        updateUser(updates.userComment),
        updateChat(updates.chat),
        updatePost(updates.post),
      ]);

      Alert.alert(
        "¡Cambio exitoso!",
        `Se realizó la recepción del código correctamente. Verás +${post.pointsAwarded} puntos sumados en tu perfil. No olvides avisarle a quien te dio el código que ya puede confirmar el cambio en su pantalla.`
      );

      router.replace(`/feed/${postId}`);
    } finally {
      resetDialog();
    }
  };

  const resetDialog = () => {
    setIsUpdating(false);
    setDialogType(null);
    setCode("");
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchChat();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, []);

  const renderDialog = () => {
    if (!dialogType) return null;

    const isPostDialog = dialogType === "post";
    const dialogProps = {
      visible: Boolean(dialogType),
      onDismiss: resetDialog,
    };

    return (
      <Dialog {...dialogProps}>
        <Dialog.Title style={styles.titleDialog}>
          Intercambio de código
        </Dialog.Title>
        <Dialog.Content>
          {isPostDialog ? (
            <Fragment>
              <TextInput
                mode="outlined"
                value={code}
                onChangeText={(text) => setCode(text.toUpperCase())}
                placeholder="Ingresa el código aquí"
                autoCapitalize="characters"
                style={[styles.inputDialog, { height: 40 }]}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Text style={styles.textDialog}>
                Comparte este código únicamente al finalizar el propósito del
                post.
              </Text>
              {!isArchived && (
                <Text style={styles.codeDialog}>{chat?.generatedCode}</Text>
              )}
              <Text style={styles.errorDialog}>
                Esta acción es IRREVERSIBLE
              </Text>
            </Fragment>
          )}
          <Text style={styles.textDialog}>
            Al confirmar el intercambio, se cerrará la publicación y no se
            podrán enviar más mensajes en el chat ni en los comentarios.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          {isPostDialog ? (
            <Button
              onPress={handleConfirmDialog}
              textColor={theme.colors.primary}
              disabled={!code || isUpdating}
              loading={isUpdating}
            >
              Intercambiar
            </Button>
          ) : (
            <Button onPress={resetDialog} textColor={theme.colors.primary}>
              Cerrar
            </Button>
          )}
        </Dialog.Actions>
      </Dialog>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Link href={`/feed/${postId}`} asChild>
            <IconButton icon="arrow-left" size={24} />
          </Link>
          <Title style={styles.headerTitle}>Chat privado</Title>
        </View>

        {!isArchived && (
          <View style={styles.headerRight}>
            <Button
              mode="contained"
              onPress={handleConfirmExchange}
              style={styles.button}
              buttonColor={theme.colors.tertiary}
              textColor={theme.colors.onTertiary}
              disabled={isUpdating}
            >
              Código
            </Button>
          </View>
        )}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Portal>{renderDialog()}</Portal>

        <View style={styles.messageContainer}>
          {chat?.ChatMessage.length ? (
            <Fragment>
              {chat.ChatMessage.map((chatMessage) => (
                <CardChatMessage
                  key={chatMessage.id}
                  chatMessage={chatMessage}
                />
              ))}
              {isArchived && (
                <View style={styles.inputWrapper}>
                  <Text style={styles.textDialog}>
                    El intercambio ha finalizado
                  </Text>
                </View>
              )}
            </Fragment>
          ) : (
            <DataEmpty displayText="Aún no hay mensajes en el chat" />
          )}
          {isPending && <ActivityIndicator size="small" />}
        </View>
      </ScrollView>

      {!isArchived && (
        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              name="message"
              rules={{ maxLength: 250 }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  mode="outlined"
                  placeholder="Deja tu comentario aquí..."
                  maxLength={250}
                  multiline
                  numberOfLines={3}
                  style={styles.input}
                  returnKeyType="default"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit(handleSend)}
            style={styles.button}
            disabled={messageLength === 0 || isUpdatingChatMessage}
            loading={isUpdatingChatMessage}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
          >
            Enviar
          </Button>
          <Text style={styles.charCount}>{messageLength}/250 caracteres</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: theme.colors.primary,
    marginLeft: 8,
  },
  headerRight: {
    margin: 20,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  messageContainer: {
    width: "100%",
  },
  inputWrapper: {
    margin: 15,
    padding: 10,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  inputContainer: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
    borderColor: theme.colors.primaryContainer,
    borderWidth: 1,
    minHeight: 60,
    maxHeight: 120,
  },
  input: {
    width: "100%",
    minHeight: 60,
    maxHeight: 120,
    paddingTop: 8,
    paddingBottom: 8,
    textAlignVertical: "top",
    color: theme.colors.onBackground,
    fontSize: 16,
  },
  button: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
  charCount: {
    alignSelf: "flex-end",
    color: theme.colors.backdrop,
    fontSize: 12,
  },
  inputDialog: {
    textAlignVertical: "center",
    marginVertical: 10,
  },
  textDialog: {
    fontSize: 14,
    color: theme.colors.tertiary,
    margin: 5,
  },
  titleDialog: {
    fontSize: 24,
    color: theme.colors.tertiary,
  },
  codeDialog: {
    fontSize: 30,
    color: theme.colors.primary,
    marginVertical: 20,
    textAlign: "center",
  },
  errorDialog: {
    color: theme.colors.error,
    textAlign: "center",
    margin: 5,
    fontSize: 14,
  },
});
