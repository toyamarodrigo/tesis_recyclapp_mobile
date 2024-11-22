import { Stack } from "expo-router";

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Feed",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          title: "Publicación",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
