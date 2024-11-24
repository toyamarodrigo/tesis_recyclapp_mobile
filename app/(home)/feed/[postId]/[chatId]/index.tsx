import { useAuth } from "@clerk/clerk-expo";
import { useChatById } from "@hooks/useChat";
import { Link, Redirect, useLocalSearchParams } from "expo-router";
import { View, SafeAreaView, ScrollView } from "react-native";
import { IconButton, Title, Text } from "react-native-paper";
import { theme } from "src/theme";

export default function Chatconvo() {
  const { userId, isSignedIn } = useAuth();
  if (!userId || !isSignedIn) return <Redirect href="/(auth)/sign-in" />;
  const params = useLocalSearchParams();
  const postId = params.postId as string;
  const chatId = params.chatId as string;
  const { data: chat } = useChatById({ id: chatId });

  console.log("chat", chat);

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href={`/feed/${postId}`} asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>
          Chat @{chat?.userPostUsername} @{chat?.userCommentUsername}
        </Title>
      </View>

      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
        <View style={{ width: "100%" }}>
          <Text>prueba</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
