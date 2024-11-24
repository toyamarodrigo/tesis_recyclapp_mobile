import { useUser } from "@clerk/clerk-expo";
import CardChatMessage from "@components/CardChatMessage";
import DataEmpty from "@components/DataEmpty";
import { useChatById } from "@hooks/useChat";
import { useCreateChatMessage } from "@hooks/useChatMessage";
import { usePostById } from "@hooks/usePost";
import { Link, Redirect, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Keyboard,
} from "react-native";
import {
  IconButton,
  Title,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
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
    console.log("messge");
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chat?.ChatMessage]);

  //TODO validar bien el input

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
          >
            Código
          </Button>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        ref={scrollViewRef}
      >
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
      <View style={styles.container}>
        <View style={[styles.inputContainer]}>
          <TextInput
            mode="outlined"
            value={tempText}
            onChangeText={setTempText}
            placeholder="Deja tu comentario aquí..."
            maxLength={250}
            multiline
            style={styles.input}
          />
        </View>
        <Button
          mode="contained"
          onPress={handleSend}
          style={styles.button}
          disabled={tempText == ""}
          buttonColor={theme.colors.primary}
          textColor={theme.colors.onPrimary}
        >
          Enviar
        </Button>
        <Text style={styles.charCount}>{tempText.length}/250 caracteres</Text>
      </View>
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
});
