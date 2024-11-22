import { Link, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, IconButton, Text } from "react-native-paper";
import { usePostById } from "@hooks/usePost";

export default function DetailPost() {
  const params = useLocalSearchParams();
  const postId = params.postId as string;

  const { data: post, isPending, isSuccess } = usePostById({ id: postId });

  console.log("post", post);

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/(home)/feed" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Text variant="titleLarge">Nueva publicación</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "space-between" }}>
        {isPending && <ActivityIndicator size="large" />}
        {isSuccess && <Text>{post?.description}</Text>}
      </View>
    </SafeAreaView>
  );
}
