import { useUser } from "@clerk/clerk-expo";
import CardChatMessage from "@components/CardChatMessage";
import DataEmpty from "@components/DataEmpty";
import { useChatById, useUpdateChat } from "@hooks/useChat";
import { useCreateChatMessage } from "@hooks/useChatMessage";
import { usePostById, useUpdatePost } from "@hooks/usePost";
import { useUpdateUserCustomer, useUserCustomerByClerk } from "@hooks/useUser";
import { ChatUpdate } from "@models/chat.type";
import { PostUpdate } from "@models/post.type";
import { UserCustomerPut } from "@models/userCustomer.type";
import { Link, Redirect, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Keyboard,
  Alert,
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

export default function Chatconvo() {
  const { user, isSignedIn } = useUser();
  if (!user || !isSignedIn) return <Redirect href="/(auth)/sign-in" />;
  const params = useLocalSearchParams();
  const postId = params.postId as string;
  const chatId = params.chatId as string;
  const { data: chat, isFetching, isLoading } = useChatById({ id: chatId });
  const { data: post } = usePostById({ id: postId });
  const [tempText, setTempText] = useState("");
  const { mutateAsync: createChatMessage } = useCreateChatMessage();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isCommentCode, setIsCommentCode] = useState(false);
  const [isPostCode, setIsPostCode] = useState(false);
  const [code, setCode] = useState("");
  const { mutateAsync: updateChat } = useUpdateChat();
  const { mutateAsync: updatePost } = useUpdatePost();
  const { data: userPostClerk } = useUserCustomerByClerk({
    userId: chat?.userPostId || "",
  });
  const { data: userCommentClerk } = useUserCustomerByClerk({
    userId: chat?.userCommentId || "",
  });
  const { mutateAsync: updateUser } = useUpdateUserCustomer();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleSend = async () => {
    if (chat) {
      await createChatMessage({
        chatId: chat?.id,
        message: tempText,
        senderId: user.id,
        senderUsername: user.username || "usuario",
      });
    }

    if (tempText.trim() !== "") {
      setTempText("");
      Keyboard.dismiss();
    }
  };

  const handleConfirmExchange = () => {
    if (user.id == post?.userId) {
      return setIsPostCode(true);
    }
    return setIsCommentCode(true);
  };

  const handleConfirmDialog = async () => {
    if (chat?.generatedCode != code.toUpperCase()) {
      return Alert.alert(
        "Error",
        "El código ingresado es incorrecto. Intente nuevamente."
      );
    } else {
      if (chat && post) {
        const date = new Date();
        const chatData: ChatUpdate = {
          id: chat.id,
          endDate: date,
          isActive: false,
          isArchived: true,
        };
        const postData: PostUpdate = {
          id: post.id,
          isActive: false,
          isArchived: true,
        };

        if (userPostClerk && userCommentClerk) {
          const userPost: UserCustomerPut = {
            id: userPostClerk.id,
            pointsTotal: userPostClerk.pointsTotal + post.pointsAwarded,
            pointsCurrent: userPostClerk.pointsCurrent + post.pointsAwarded,
          };
          const userComment: UserCustomerPut = {
            id: userCommentClerk.id,
            pointsTotal: userCommentClerk.pointsTotal + post.pointsAwarded,
            pointsCurrent: userCommentClerk.pointsCurrent + post.pointsAwarded,
          };
          setIsUpdating(true);
          await updateUser(userPost);
          await updateUser(userComment);
          await updateChat(chatData);
          await updatePost(postData);
          resetDialog();

          Alert.alert(
            "¡Cambio exitoso!",
            `Se realizó la recepción del código correctamente. Verás +${post?.pointsAwarded} puntos sumados en tu perfil. No olvides avisarle a quien te dio el código que ya puede confirmar el cambio en su pantalla.`
          );
        }
      }
    }
  };

  const handleConfirmComment = async () => {
    if (chat) {
      const date = new Date();
      const chatData: ChatUpdate = {
        id: chat.id,
        endDate: date,
        isActive: false,
        isArchived: true,
      };
      await updateChat(chatData);
      resetDialog();
      Alert.alert(
        "¡Cambio exitoso!",
        `Cuando el autor del post confirme el codigo, verás +${post?.pointsAwarded} puntos sumados en tu perfil.`
      );
    }
  };

  const resetDialog = () => {
    setIsUpdating(false);
    setIsCommentCode(false);
    setIsPostCode(false);
    setCode("");
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chat?.ChatMessage]);

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Link href={`/feed/${postId}`} asChild>
            <IconButton icon="arrow-left" size={24} />
          </Link>
          <Title style={{ color: theme.colors.primary, marginLeft: 8 }}>
            Chat privado
          </Title>
        </View>

        <View style={{ margin: 20 }}>
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
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        ref={scrollViewRef}
      >
        <Portal>
          {/*Post User Dialog*/}
          <Dialog visible={isPostCode} onDismiss={resetDialog}>
            <Dialog.Title style={styles.titleDialog}>
              Intercambio de código
            </Dialog.Title>
            <Dialog.Content>
              {!chat?.isArchived && (
                <TextInput
                  mode="outlined"
                  value={code.toUpperCase()}
                  onChangeText={setCode}
                  placeholder="Ingresa el código aquí"
                  maxLength={250}
                  multiline
                  style={styles.inputDialog}
                />
              )}
              <Text style={styles.textDialog}>
                Al confirmar el intercambio, se cerrará la publicación y no se
                podrán enviar más mensajes en el chat ni en los comentarios.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={resetDialog}
                textColor={theme.colors.error}
                disabled={isUpdating}
              >
                Cancelar
              </Button>
              {!chat?.isArchived && (
                <Button
                  onPress={handleConfirmDialog}
                  textColor={theme.colors.primary}
                  disabled={code == "" || isUpdating}
                >
                  Intercambiar
                </Button>
              )}
            </Dialog.Actions>
          </Dialog>
          {/*Comment User Dialog*/}
          <Dialog visible={isCommentCode} onDismiss={resetDialog}>
            <Dialog.Title style={styles.titleDialog}>
              Intercambio de código
            </Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textDialog}>
                Comparte este código únicamente al finalizar el propósito del
                post.
              </Text>
              {!chat?.isArchived && (
                <Text style={styles.codeDialog}>{chat?.generatedCode}</Text>
              )}
              <Text style={styles.textDialog}>
                Al confirmar el intercambio, se cerrará la publicación y no se
                podrán enviar más mensajes en el chat ni en los comentarios.
              </Text>
              <Text style={styles.errorDialog}>
                Esta acción es IRREVERSIBLE
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={resetDialog}
                textColor={theme.colors.error}
                disabled={isUpdating}
              >
                Cancelar
              </Button>
              {!chat?.isArchived && (
                <Button
                  onPress={handleConfirmComment}
                  textColor={theme.colors.primary}
                  disabled={isUpdating}
                >
                  Intercambiar
                </Button>
              )}
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={{ width: "100%" }}>
          {(isFetching || isLoading) && <ActivityIndicator size={"large"} />}
          {chat?.ChatMessage.length ? (
            chat.ChatMessage.map((chatMessage) => (
              <CardChatMessage key={chatMessage.id} chatMessage={chatMessage} />
            ))
          ) : (
            <DataEmpty displayText="Aún no hay mensajes en el chat" />
          )}
        </View>
      </ScrollView>
      <View style={{ flex: 1 }} />
      {!chat?.isArchived && (
        <View style={styles.container}>
          <View style={[styles.inputContainer]}>
            <TextInput
              mode="outlined"
              value={tempText}
              onChangeText={setTempText}
              placeholder={
                chat?.isArchived
                  ? "Chat finalizado"
                  : "Deja tu comentario aquí..."
              }
              maxLength={250}
              multiline
              style={styles.input}
              disabled={chat?.isArchived}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleSend}
            style={styles.button}
            disabled={chat?.isArchived || tempText == "" || isUpdating}
            buttonColor={theme.colors.primary}
            textColor={theme.colors.onPrimary}
          >
            Enviar
          </Button>
          <Text style={styles.charCount}>{tempText.length}/250 caracteres</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 10,
    backgroundColor: theme.colors.background,
    borderRadius: 8,
  },
  inputContainer: {
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
    borderColor: theme.colors.primaryContainer,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    width: "100%",
    height: 60,
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
    height: 60,
    textAlignVertical: "top",
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
